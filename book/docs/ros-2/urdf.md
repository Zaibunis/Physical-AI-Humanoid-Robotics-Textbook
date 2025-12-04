---
sidebar_position: 2
---

# Chapter 1.2: Creating a Humanoid Description (URDF)

To interact with a robot in simulation or visualize it in a robot's operating environment, we need a standardized way to describe its physical characteristics. The Unified Robot Description Format (URDF) is an XML-based file format used in ROS to describe all aspects of a robot, including its kinematic and dynamic properties, visual appearance, and collision models.

This chapter will guide you through creating a URDF model, focusing on the components relevant for a humanoid or proxy robot.

## What is URDF?

URDF allows you to define a robot as a set of **links** and **joints**.

-   **Links**: Represent the rigid bodies of the robot (e.g., torso, head, upper arm, forearm, hand). Each link has physical properties such as mass, inertia, visual geometry (how it looks), and collision geometry (how it interacts physically).
-   **Joints**: Represent the connections between links. Joints define the degrees of freedom (DOF) of the robot, allowing links to move relative to each other. Common joint types include:
    -   `revolute`: Rotational joint with a limited range (e.g., an elbow).
    -   `continuous`: Rotational joint with unlimited range (e.g., a wheel).
    -   `prismatic`: Translational joint with a limited range (e.g., a linear actuator).
    -   `fixed`: No movement, rigidly connects two links (e.g., a camera mounted on a head).

### Why URDF?

-   **Visualization**: URDF models can be loaded into RViz (ROS Visualization) or Gazebo to render the robot's structure and simulate its movements.
-   **Kinematics/Dynamics**: Software packages can parse URDF to perform forward and inverse kinematics, dynamics calculations, and collision detection.
-   **Modularity**: You can define robot components as separate URDF files and combine them.

## Basic URDF Structure

A URDF file starts with a `<robot>` tag, which contains one or more `<link>` and `<joint>` tags.

```xml
<?xml version="1.0"?>
<robot name="my_humanoid_robot">

  <!-- Define links -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.1 0.1 0.2"/>
      </geometry>
    </visual>
  </link>

  <link name="head_link">
    <visual>
      <geometry>
        <sphere radius="0.05"/>
      </geometry>
    </visual>
  </link>

  <!-- Define joints -->
  <joint name="base_to_head_joint" type="revolute">
    <parent link="base_link"/>
    <child link="head_link"/>
    <origin xyz="0 0 0.1" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.57" upper="1.57" velocity="1.0" effort="100"/>
  </joint>

</robot>
```

### Key Elements in Detail

#### `<link>`

-   **`name`**: Unique identifier for the link.
-   **`<visual>`**: Defines how the link appears.
    -   **`<geometry>`**: Shape (box, cylinder, sphere, mesh).
    -   **`<material>`**: Color or texture.
    -   **`<origin>`**: Offset and orientation relative to the link's own frame.
-   **`<collision>`**: Defines the shape used for collision detection. Often simpler than the visual geometry.
-   **`<inertial>`**: Defines mass, center of mass, and inertia tensor for physics calculations. Crucial for realistic simulation.

#### `<joint>`

-   **`name`**: Unique identifier for the joint.
-   **`type`**: Revolute, continuous, prismatic, fixed, planar, floating.
-   **`<parent link="..." />`**: The link closer to the robot's base.
-   **`<child link="..." />``**: The link further from the robot's base, which moves relative to the parent.
-   **`<origin xyz="X Y Z" rpy="R P Y"/>`**: The joint's position and orientation relative to the parent link's frame. `xyz` is translation, `rpy` (roll, pitch, yaw) is rotation in radians.
-   **`<axis xyz="X Y Z"/>`**: For revolute/prismatic joints, defines the axis of motion in the joint's own frame.
-   **`<limit lower="..." upper="..." velocity="..." effort="..."/>`**: Constraints on joint movement.

## Building a Humanoid URDF (Step-by-Step)

For a simple humanoid, you might consider links for:
-   `base_link` (torso)
-   `head_link`
-   `upper_arm_link` (left/right)
-   `forearm_link` (left/right)
-   `hand_link` (left/right)
-   `upper_leg_link` (left/right)
-   `lower_leg_link` (left/right)
-   `foot_link` (left/right)

Each connection between these will be a joint. For example, `base_to_head_joint`, `base_to_shoulder_joint`, `elbow_joint`, `knee_joint`, etc.

### Step 1: Define the Base Link

Start with a simple base link that acts as the robot's origin.

```xml
<!-- base_link (torso) -->
<link name="base_link">
  <visual>
    <geometry>
      <box size="0.2 0.15 0.4"/> <!-- Torso dimensions -->
    </geometry>
    <material name="blue">
      <color rgba="0 0 0.8 1"/>
    </material>
  </visual>
  <collision>
    <geometry>
      <box size="0.2 0.15 0.4"/>
    </geometry>
  </collision>
  <inertial>
    <mass value="5.0"/>
    <origin xyz="0 0 0"/>
    <inertia ixx="0.1" ixy="0.0" ixz="0.0" iyy="0.1" iyz="0.0" izz="0.1"/>
  </inertial>
</link>
```
### Step 2: Add the Head

Connect the head to the base via a neck joint. A simple revolute joint might allow the head to nod or turn.

```xml
<!-- head_link -->
<link name="head_link">
  <visual>
    <geometry>
      <sphere radius="0.1"/>
    </geometry>
    <material name="red">
      <color rgba="0.8 0 0 1"/>
    </material>
  </visual>
  <collision>
    <geometry>
      <sphere radius="0.1"/>
    </geometry>
  </collision>
  <inertial>
    <mass value="0.5"/>
    <origin xyz="0 0 0"/>
    <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.01"/>
  </inertial>
</link>

<!-- neck_joint -->
<joint name="neck_joint" type="revolute">
  <parent link="base_link"/>
  <child link="head_link"/>
  <origin xyz="0 0 0.25" rpy="0 0 0"/> <!-- Position relative to base_link top -->
  <axis xyz="0 0 1"/> <!-- Yaw around Z-axis -->
  <limit lower="-1.57" upper="1.57" velocity="1.0" effort="100"/>
</joint>
```

You would continue this process for all limbs, creating links and joints to describe the full kinematic chain. Pay close attention to `origin` tags for proper placement and `axis` for correct joint motion.

## Xacro: URDF with Macros

Writing large URDF files can become repetitive, especially for symmetric parts like arms or legs. **Xacro** (XML Macros) is an XML macro language that allows you to write shorter, more readable XML files that are then expanded into a full URDF.

Xacro allows for:
-   **Macros**: Define reusable blocks of XML.
-   **Properties**: Define variables to avoid hardcoding values.
-   **Mathematical expressions**: Perform calculations within the XML.

```xml
<?xml version="1.0"?>
<robot name="my_robot" xmlns:xacro="http://www.ros.org/wiki/xacro">

  <!-- Define a property for arm length -->
  <xacro:property name="arm_length" value="0.3"/>

  <!-- Define a macro for a generic arm segment -->
  <xacro:macro name="arm_segment" params="prefix parent_link">
    <link name="${prefix}_link">
      <visual>
        <geometry>
          <cylinder radius="0.02" length="${arm_length}"/>
        </geometry>
      </visual>
    </link>

    <joint name="${prefix}_joint" type="revolute">
      <parent link="${parent_link}"/>
      <child link="${prefix}_link"/>
      <origin xyz="${arm_length/2} 0 0" rpy="0 0 0"/>
      <axis xyz="0 1 0"/>
      <limit lower="-1.57" upper="1.57" velocity="1.0" effort="100"/>
    </joint>
  </xacro:macro>

  <!-- Instantiate the arm segments -->
  <link name="base_link"/>
  <xacro:arm_segment prefix="right_arm" parent_link="base_link"/>
  <xacro:arm_segment prefix="left_arm" parent_link="base_link"/>

</robot>
```
To process a Xacro file into a URDF, you would typically use:
`ros2 run xacro xacro --inorder my_robot.xacro > my_robot.urdf`

## Summary

URDF is a powerful and essential tool for describing your robot's physical structure in ROS 2. Understanding links, joints, and their properties is fundamental for accurate visualization and simulation. For complex robots, Xacro simplifies the creation and maintenance of these descriptive models. In the next chapter, we'll see how to use these descriptions within simulation environments.