---
sidebar_position: 2
---

# Chapter 2.2: Designing a Digital Environment

A robot's behavior is deeply influenced by its environment. A cluttered apartment, a structured warehouse, or an outdoor campus all present unique challenges. To effectively test our robot, we need to create digital environments that replicate the key features of its intended operating domain.

This chapter covers the process of designing and building a simulation world in Gazebo, from simple shapes to complex, pre-made environments.

## The Simulation Description Format (SDF)

While URDF is excellent for describing the kinematics and dynamics of a single robot, Gazebo uses a more comprehensive format called the **Simulation Description Format (SDF)** for describing entire worlds. SDF is an XML format that can specify everything about a simulation, including:

-   Robots (it can contain full URDF-like descriptions)
-   Static objects (buildings, furniture)
-   Dynamic objects (balls, other robots)
-   Lighting
-   Physics properties (gravity, friction coefficients)
-   Sensor plugins

A typical Gazebo world file (e.g., `my_world.sdf`) looks like this:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="default">

    <!-- Set up lighting -->
    <include>
      <uri>model://sun</uri>
    </include>

    <!-- Add a ground plane -->
    <include>
      <uri>model://ground_plane</uri>
    </include>

    <!-- Define physics properties -->
    <physics type="ode">
      <max_step_size>0.001</max_step_size>
      <real_time_factor>1.0</real_time_factor>
    </physics>

    <!-- Add a robot model -->
    <include>
      <uri>model://my_robot</uri>
      <name>my_robot_instance</name>
      <pose>0 0 0.5 0 0 0</pose>
    </include>

    <!-- Add a simple box -->
    <model name="simple_box">
      <pose>2.0 1.0 0.25 0 0 0</pose>
      <link name="box_link">
        <collision name="collision">
          <geometry>
            <box><size>0.5 0.5 0.5</size></box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box><size>0.5 0.5 0.5</size></box>
          </geometry>
        </visual>
      </link>
    </model>

  </world>
</sdf>
```

### Key SDF Tags in a World File:

-   `<world>`: The root element for a world description.
-   `<include>`: A powerful tag that lets you include other SDF models from Gazebo's model database or a local path. This is the standard way to add common items like a sun, ground plane, or your robot.
-   `<physics>`: Configures the physics engine, including simulation step size and the real-time factor (how fast simulation runs compared to real time).
-   `<model>`: Defines an object in the world. It can be simple (like the box above) or a complex, multi-link robot.
-   `<pose>`: Sets the initial position (`x y z`) and orientation (`roll pitch yaw`) of a model in the world.

## Spawning a URDF Robot in a Gazebo World

You might notice that SDF looks a lot like URDF. SDF is actually a superset of URDF. While you *can* define a full robot in SDF, the common ROS workflow is to keep your robot in a URDF/Xacro file and then "spawn" it into an SDF world.

A special ROS 2 node, `spawn_entity.py` provided by the `gazebo_ros` package, handles this conversion. It reads a URDF file and then makes a service call to the Gazebo server to add the robot model to the running simulation.

A typical ROS 2 launch file for starting a simulation includes:
1.  A node to start the Gazebo server with a specific world file.
2.  A node to start the Gazebo GUI client (optional but useful).
3.  A `robot_state_publisher` node, which reads the URDF and publishes the robot's joint states to the `/tf` topic.
4.  A node that runs `spawn_entity.py` to add your robot's URDF model to Gazebo.

## Building a World

There are three main approaches to creating a world for your robot.

### 1. The Graphical World Builder

Gazebo provides a built-in graphical interface for creating worlds.

-   **Start Gazebo**: `gazebo`
-   **Simple Shapes**: In the top toolbar, you can select simple shapes (box, sphere, cylinder) and place them in the world. You can then use the translate and rotate tools to position them.
-   **Model Database**: Gazebo comes with a database of pre-built models (tables, chairs, etc.). You can access these from the "Insert" tab on the left and drag-and-drop them into the scene.
-   **Save the World**: Once you are happy with your environment, you can save it via `File -> Save World As...` to generate the `.sdf` file.

This method is excellent for creating simple test environments quickly.

### 2. Using the Gazebo Fuel Model Database

For more complex and realistic worlds, you can leverage the **Gazebo Fuel** online model database. This is a vast, cloud-based repository of robots, buildings, and objects that you can include directly in your world SDF file.

For example, to include a complex model of a warehouse, you might use an `<include>` tag pointing to its Fuel URL:

```xml
<include>
  <uri>https://fuel.gazebosim.org/1.0/OpenRobotics/models/Depot</uri>
</include>
```
When Gazebo starts, it will automatically download the model and all its assets (meshes, textures) and place them in the world. This is the fastest way to create a rich, realistic environment for testing navigation and perception.

### 3. Creating Custom Models and Worlds from Meshes

For maximum control, you can create your own environments in 3D modeling software like **Blender** or **Sketchup**.

The typical workflow is:
1.  **Model the Environment**: Create the 3D geometry of your world (e.g., a house layout, an office floor) in your chosen software.
2.  **Export as Meshes**: Export the geometry in a format that Gazebo can read, such as `.dae` (Collada) or `.stl`. It's best to separate the visual mesh from the (often simpler) collision mesh.
3.  **Create a Model SDF**: Create a new Gazebo model directory and a `model.sdf` file. Inside this file, define your links and reference your exported meshes in the `<visual>` and `<collision>` tags.
4.  **Add to Your World**: Include your new custom model in your main `world.sdf` file.

This approach requires more effort but is necessary when you need to simulate a very specific or unique environment that doesn't exist in public databases.

## Summary

Designing a digital environment is a critical step in building a robust simulation testbed. Gazebo's SDF format provides a powerful way to define worlds, from simple obstacle courses to complex, realistic environments. By using a combination of the graphical builder, the Gazebo Fuel database, and custom 3D models, you can create the perfect digital twin of the world your robot will inhabit.