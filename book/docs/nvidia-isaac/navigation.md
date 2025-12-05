---
sidebar_position: 3
---

# Chapter 3.3: Navigation and Mapping (VSLAM, Nav2)

Once a robot can perceive its environment, the next logical step is to move through it safely and purposefully. This is the domain of navigation. Modern robot navigation is a complex interplay of three core components: **mapping**, **localization**, and **planning**.

-   **Mapping**: Building a map of an unknown environment.
-   **Localization**: Figuring out where the robot is within that map.
-   **Planning**: Calculating a path from the robot's current location to a desired goal location, while avoiding obstacles.

This chapter explores how we combine hardware-accelerated perception from Isaac ROS with the powerful, industry-standard ROS 2 navigation stack, **Nav2**.

## SLAM: Mapping and Localization Together

In many scenarios, a robot starts in an environment it has never seen before. It needs to build a map and localize itself within that map at the same time. This chicken-and-egg problem is solved by **Simultaneous Localization and Mapping (SLAM)**.

### Isaac ROS VSLAM

As we introduced in the previous chapter, `isaac_ros_vslam` is a hardware-accelerated Visual SLAM package. It uses stereo camera images to perform two key functions simultaneously:

1.  **Visual Odometry**: It tracks the robot's motion frame-by-frame, providing a high-frequency estimate of its movement. This is the "Localization" part of SLAM.
2.  **Mapping**: It identifies and tracks stable feature points in the environment, building up a sparse map of 3D landmarks. This is the "Mapping" part.

The output of `isaac_ros_vslam` is crucial for navigation. It provides a stable and accurate `odom` -> `base_link` transform, which tells the rest of the system how the robot's base is moving relative to its starting point (the "odom" frame). This is a critical input for Nav2.

## Nav2: The ROS 2 Navigation Stack

Nav2 is the successor to the original ROS Navigation Stack and is the de facto standard for autonomous navigation in ROS 2. It is not a single node but a highly configurable system of servers that work together to achieve robust navigation.

The basic data flow for Nav2 is as follows:
1.  **A goal is given**: A user or an AI agent sends a goal pose (an x, y position and a yaw orientation) to the Nav2 system, typically via a ROS 2 action.
2.  **Global Planning**: The **Planner Server** calculates a high-level path from the robot's current location to the goal. It operates on a **global costmap**, which is a 2D grid representation of the environment that includes long-term obstacles like walls.
3.  **Local Planning**: The **Controller Server** takes the global plan and generates immediate motor commands (e.g., velocity and direction). It operates on a **local costmap**, which is smaller, moves with the robot, and includes short-term, dynamic obstacles detected by sensors like LiDAR or depth cameras.
4.  **Recovery**: If the robot gets stuck, the **Recovery Server** can trigger fallback behaviors, like backing up, rotating in place, or clearing the costmaps.

![Nav2 Architecture](https://navigation.ros.org/_images/nav2_overview.png)
*Credit: Nav2 Documentation*

### Costmaps: The Key to Safe Navigation

A **costmap** is the data structure that enables Nav2 to perform safe path planning. It's a grid where each cell has a value representing its "cost" to traverse.

-   **Free Space (Cost = 0)**: Open areas where the robot can safely travel.
-   **Inscribed Cost**: Areas where the robot's inscribed radius (the largest circle that can fit within its footprint) would touch an obstacle. This is a high-cost area.
-   **Inflation (Cost > 0)**: An "aura" of cost around obstacles. The cost decreases as you get further from the obstacle. By planning a path through the lowest-cost cells, the planner naturally keeps the robot at a safe distance from walls and other hazards.
-   **Lethal Obstacles (Cost = 255)**: Cells that are occupied by a definite obstacle. The planner will never create a path through these cells.

The **global costmap** is typically built once from a static map created by a SLAM algorithm. The **local costmap** is updated continuously in real-time using live sensor data, allowing the robot to react to people, furniture, or other unexpected obstacles.

### Integrating Isaac ROS and Nav2

This is where all the pieces come together. A typical hardware-accelerated navigation setup involves:

1.  **Sensor Data**: A stereo camera publishes images.
2.  **VSLAM (Localization)**: `isaac_ros_vslam` subscribes to the stereo images and publishes the `odom` -> `base_link` transform. This tells Nav2 where the robot is and how it's moving.
3.  **Depth Perception (Obstacle Avoidance)**: `isaac_ros_dnn_stereo_depth` subscribes to the stereo images and publishes a point cloud.
4.  **Costmap Generation**: The Nav2 costmap layers subscribe to the point cloud topic. This data is used to place lethal obstacles and inflated costs into the local and global costmaps.
5.  **Navigation**: The Nav2 planner and controller servers use the costmaps and the robot's pose from VSLAM to plan safe paths to a goal.

In this configuration, the most computationally intensive parts of the system—visual odometry and depth perception—are offloaded to the GPU via the Isaac ROS packages. This frees up the CPU to focus on the high-level planning and logic managed by Nav2, resulting in a highly performant and robust navigation system.

## Summary

Successful robot navigation requires a robust combination of mapping, localization, and planning. By using Isaac ROS VSLAM for fast and accurate localization and feeding GPU-accelerated perception data into the industry-standard Nav2 stack, we can build a state-of-the-art navigation system. This modular approach allows us to leverage the best of both worlds: the performance of NVIDIA's hardware acceleration and the flexibility and power of the open-source Nav2 project.