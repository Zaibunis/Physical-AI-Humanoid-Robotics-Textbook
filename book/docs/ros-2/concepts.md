---
sidebar_position: 1
---

# Chapter 1.1: Introduction to ROS 2 Concepts

Welcome to the foundational chapter of our journey into robotics. Before we can make our robot see, think, or act, we need to build its nervous system. In modern robotics, that nervous system is the Robot Operating System (ROS). This chapter introduces the core concepts of ROS 2, the second generation of ROS, which provides the communication backbone for all other components we will build.

## What is ROS?

ROS is not a traditional operating system like Windows or Ubuntu. Instead, it's a **middleware**—a flexible framework for writing robot software. It provides a collection of tools, libraries, and conventions that aim to simplify the task of creating complex and robust robot behavior across a wide variety of robotic platforms.

Key features of ROS include:
- **Anonymous publish/subscribe messaging**: The primary communication method.
- **Distributed computing**: ROS allows a robotic system to be composed of many small, independent programs called "nodes" that can run on different computers.
- **Rich ecosystem**: A large collection of open-source packages for everything from navigation and mapping to manipulation and perception.

## The ROS 2 Graph: Nodes, Topics, Services, and Actions

The ROS 2 "Graph" is the network of ROS 2 nodes and the connections between them. Understanding the components of this graph is fundamental to understanding ROS.

### 1. Nodes

A **Node** is the smallest unit of computation in ROS 2. Think of a node as a single, dedicated program responsible for one specific task. For example, you might have:
- A node for controlling the wheel motors.
- A node for reading data from a laser scanner.
- A node for planning a path.
- A node for processing images from a camera.

Each node is an independent executable that can be run, stopped, and restarted without affecting other nodes (provided the system is designed correctly). This modularity is a core strength of ROS. In this book, we will write our AI-driven logic as Python nodes using the `rclpy` client library.

### 2. Topics

**Topics** are the primary way that nodes communicate. They are named buses over which nodes exchange messages. A node can **publish** messages to a topic, and any node that **subscribes** to that topic will receive those messages.

- **Analogy**: Think of a topic like a radio station. One person (the publisher) broadcasts on a specific frequency (the topic name), and anyone with a radio tuned to that frequency (the subscribers) can listen. The broadcaster doesn't know or care who is listening.

- **Key Characteristics**:
  - **Asynchronous**: The publisher sends a message and doesn't wait for a response.
  - **Many-to-Many**: A single topic can have multiple publishers and multiple subscribers.
  - **Typed**: Every topic has a specific message type (e.g., `String`, `Int32`, `PoseStamped`). Only messages of that type can be published on the topic.

*Example*: A camera node might publish images to an `/image_raw` topic, and an image processing node would subscribe to that topic to receive the images.

### 3. Services

While topics are great for continuous data streams, they aren't suitable for request/response interactions. For that, ROS 2 provides **Services**.

A service is defined by a pair of messages: a **request** and a **response**. One node (the **client**) sends a request message to another node (the **server**), which then does some work and sends back a response message.

- **Analogy**: A service is like making a phone call. You (the client) dial a number (the service name) to ask a specific person (the server) a question (the request). You then wait on the line until you get an answer (the response).

- **Key Characteristics**:
  - **Synchronous**: The client waits until the server provides a response.
  - **One-to-One**: A service call is a direct interaction between one client and one server.
  - **Typed**: Like topics, services have a specific service type, which defines the structure of the request and response messages.

*Example*: A node might provide a `/set_robot_speed` service. A client could call this service with a request like `speed = 0.5`, and the server would respond with `success = true` after adjusting the motor controllers.

### 4. Actions

**Actions** are used for long-running, feedback-driven tasks. They are similar to services but provide more functionality for tasks that might take a significant amount of time to complete (e.g., navigating to a goal, picking up an object).

An action involves three parts:
1.  **Goal**: The client sends a goal to an action server (e.g., "navigate to position X, Y, Z").
2.  **Feedback**: While the server is working on the goal, it can periodically send feedback messages to the client (e.g., "current distance to goal is 5.2 meters").
3.  **Result**: When the task is finished, the server sends a final result message (e.g., "goal reached successfully").

- **Analogy**: An action is like ordering a pizza. You (the client) place an order with a specific goal (a large pepperoni pizza). You can check the status online for feedback (preparing, baking, out for delivery). Finally, you receive the result (the pizza arrives). You can also cancel the order mid-process.

- **Key Characteristics**:
  - **Asynchronous & Preemptible**: The client doesn't have to block while waiting for the result and can choose to cancel the goal at any time.
  - **Provides Feedback**: The client gets updates on the progress of the task.

*Example*: The ROS 2 navigation system, Nav2, uses an action to receive a goal pose. While the robot is moving, it provides feedback on its current position, and once it arrives, it sends a result indicating success or failure.

## Summary

| Concept | Communication Style | Analogy | Use Case |
|---|---|---|---|
| **Topic** | One-way data stream | Radio Station | Continuous sensor data, robot status updates |
| **Service** | Two-way request/response | Phone Call | Triggering a quick, blocking computation or state change |
| **Action** | Two-way with feedback | Ordering a Pizza | Long-running, non-blocking tasks like navigation or manipulation |

Understanding these four concepts is the first major step to mastering ROS 2. In the following chapters, we will use these components to build our robot's software architecture.