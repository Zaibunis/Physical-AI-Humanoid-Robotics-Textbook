---
sidebar_position: 2
---

# Chapter 5.2: Integrating the Full Pipeline

This chapter is the heart of the capstone project. Here, we will write the code for the four custom ROS 2 nodes that make up our VLA pipeline and create the main launch file to run the entire system. The conceptual outlines from Module 4 will now be turned into a functional, integrated application.

We will create a single ROS 2 package named `vla_system` to contain all our nodes.

```bash
cd your_ros2_ws/src
ros2 pkg create --build-type ament_python vla_system
```

## 1. The Voice Commander Node (`vla_system/voice_commander.py`)

This node's sole purpose is to listen for a voice command, transcribe it, and publish it.

-   **Functionality**: Implements the conceptual outline from Chapter 4.1.
-   **Key Libraries**: `rclpy`, `std_msgs`, `openai-whisper`, `sounddevice`, `numpy`.
-   **Subscribers**: None.
-   **Publishers**:
    -   Topic: `/recognized_command`
    -   Type: `std_msgs/String`
-   **Logic**:
    1.  Initialize a ROS 2 node and a publisher.
    2.  Load the Whisper model (e.g., "tiny.en" or "base.en" for good performance without a high-end GPU).
    3.  Open a `sounddevice` input stream to the microphone.
    4.  Implement a simple Voice Activity Detection (VAD) loop:
        -   Continuously read audio chunks.
        -   Calculate the audio energy (RMS).
        -   When energy is above a threshold, start recording into a buffer.
        -   When energy drops below the threshold for a set duration (e.g., 1-2 seconds), stop recording.
    5.  Pass the recorded audio buffer to `whisper.transcribe()`.
    6.  Take the resulting text, create a `String` message, and publish it.
    7.  Return to the listening state.

## 2. The LLM Planner Node (`vla_system/llm_planner.py`)

This node acts as the brain, converting the unstructured text command into a structured JSON plan.

-   **Functionality**: Implements the conceptual outline from Chapter 4.2.
-   **Key Libraries**: `rclpy`, `std_msgs`, `json`, `openai` (or a library for a local LLM).
-   **Subscribers**:
    -   Topic: `/recognized_command`
    -   Type: `std_msgs/String`
-   **Publishers**:
    -   Topic: `/action_plan`
    -   Type: `std_msgs/String`
-   **Logic**:
    1.  In the `__init__` method, define the detailed prompt string, including the persona, the list of available robot functions (`go_to`, `find_object`, etc.), and the required JSON output format.
    2.  The subscriber's callback is triggered when a new text command is published.
    3.  Inside the callback, insert the received command into the prompt.
    4.  Make an API call to the LLM (either a cloud service or a local inference server).
    5.  Receive the LLM's text response.
    6.  **Crucially, validate the response**. Check if it's valid JSON and if it conforms to the expected structure (an array of objects with "function" and "parameters" keys). This prevents malformed plans from crashing the system.
    7.  If the plan is valid, serialize the JSON back into a string and publish it on the `/action_plan` topic.

## 3. The Vision Service Node (`vla_system/vision_service.py`)

This node provides an on-demand service for finding objects based on a text description.

-   **Functionality**: Implements the conceptual outline from Chapter 4.3.
-   **Key Libraries**: `rclpy`, `sensor_msgs`, `cv_bridge`, `transformers` (for a CLIP model), `torch`, `OpenCV`.
-   **Services Provided**:
    -   Service: `/find_object_service`
    -   Type: `my_interfaces/srv/FindObject` (a custom service definition).
-   **Subscribers**:
    -   Topic: `/camera/image_raw` (or similar) to get the latest image.
    -   Topic: `/camera/depth/image_raw` or `/camera/points` to get 3D data.
-   **Logic**:
    1.  In the `__init__` method, load the chosen VLM/CLIP model from Hugging Face and prepare it for inference.
    2.  The service callback `find_object_callback` is triggered by a client request.
    3.  The core logic involves the "propose, embed, compare" loop:
        -   Use a simple algorithm (e.g., color thresholding or edge detection in OpenCV) to propose candidate bounding boxes in the latest image.
        -   For each box, crop the image.
        -   Use the VLM to get embeddings for each image crop and for the text description from the request (e.g., "a red can").
        -   Calculate the similarity score between the text embedding and each image embedding.
        -   The box with the highest score is the best match.
    4.  If a match is found with a high enough confidence score, find the 3D coordinates of the object using the depth data corresponding to the center of the winning bounding box.
    5.  Populate the service response message (`success=True`, object ID, 3D pose) and return it.

## 4. The Action Executor Node (`vla_system/action_executor.py`)

This node is the main coordinator, turning the plan into actions.

-   **Functionality**: Implements the conceptual outline from Chapter 4.4.
-   **Key Libraries**: `rclpy`, `std_msgs`, `json`, `rclpy.action`.
-   **Subscribers**:
    -   Topic: `/action_plan`
    -   Type: `std_msgs/String`
-   **Action Clients**:
    -   `nav2_msgs/action/NavigateToPose` for navigation.
-   **Service Clients**:
    -   `my_interfaces/srv/FindObject` for vision.
-   **Logic**:
    1.  The `plan_callback` receives the JSON plan.
    2.  It iterates through the list of steps in the plan. This should be a **sequential, blocking loop**. The node must wait for one action to finish before starting the next.
    3.  A `for` loop iterates through the plan:
        -   **If `go_to`**: Call a method that creates a `NavigateToPose` action client, sends the goal (looking up coordinates for a named location like 'table'), and **waits for the result**.
        -   **If `find_object`**: Call a method that creates a service client for `/find_object_service`, sends the request, and **waits for the response**. Store the returned object ID and pose in a member variable.
        -   **If `pick_up`**: (For the extension) Call a manipulation action server, using the stored object ID/pose.
    4.  If any step fails, the loop should break, and the node should report the failure.
    5.  If all steps succeed, the node reports overall success.

## 5. The Main Launch File (`vla_system/launch/main_launch.py`)

This Python-based launch file ties everything together. It is responsible for starting all the other nodes and systems.

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        # Start Gazebo, Nav2, etc. (often by including other launch files)
        
        # Start our custom nodes
        Node(
            package='vla_system',
            executable='voice_commander',
            name='voice_commander_node'
        ),
        Node(
            package='vla_system',
            executable='llm_planner',
            name='llm_planner_node'
        ),
        Node(
            package='vla_system',
            executable='vision_service',
            name='vision_service_node'
        ),
        Node(
            package='vla_system',
            executable='action_executor',
            name='action_executor_node',
            output='screen' # Useful for debugging
        ),
    ])
```
Running `ros2 launch vla_system main_launch.py` will bring the entire intelligent system online, ready to receive its first voice command.

## Summary

By creating four distinct ROS 2 nodes, each with a clear responsibility, we build a complex application from simple, testable parts. This chapter provides the blueprint for the code that integrates our VLA pipeline. The final chapters will focus on deploying this system in simulation and discussing the sim-to-real transfer process.