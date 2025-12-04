# Research & Decisions

This document records the key architectural decisions and tradeoffs considered during the planning phase for the "Physical AI & Humanoid Robotics" book.

## 1. Decisions Requiring Documentation

The following key decisions have been made and will be documented thoroughly within the book's content:

- **Module Sequencing and Dependencies**: The book will follow a logical progression:
  1.  ROS 2 (The foundation)
  2.  Simulation with Gazebo/Unity (Creating the environment)
  3.  NVIDIA Isaac (The AI brain)
  4.  Vision-Language-Action (VLA) (Adding intelligence)
  5.  Capstone Project (Integration)
  *Rationale*: This order provides a structured learning path, where each module builds upon the previous one.

- **Choice of Simulation Platform and Hardware**:
  - The book will provide primary examples using **Gazebo** for its strong physics simulation and ROS integration, with notes on using **Unity** for high-fidelity rendering.
  - The primary Edge AI kit will be the **NVIDIA Jetson Orin Nano/NX** due to its balance of performance and cost, and its direct support for the NVIDIA Isaac stack.
  - The **Unitree Go2** will be used as the primary "proxy" robot, with the **Unitree G1** referenced for full humanoid examples.
  *Rationale*: These choices represent a common, powerful, and relatively accessible stack for modern robotics development.

- **Cloud vs. On-Premise Deployment**:
  - All real-time control loops and latency-sensitive processes will be documented for **on-premise deployment** on a workstation or Jetson device.
  - The cloud (AWS/NVIDIA Omniverse) will only be referenced for **simulation and model training** where massive parallelization is beneficial.
  *Rationale*: This aligns with real-world robotics constraints where network latency is a critical failure point for robot control.

- **Depth of Technical Content**:
  - The book will aim for an intermediate to advanced level.
  - Code examples will be complete and functional, not just snippets.
  - The Capstone project will be complex enough to demonstrate a full "sense-plan-act" loop but simple enough to be achievable by students.
  *Rationale*: The goal is to create a practical guide that goes beyond introductory concepts.

## 2. Tradeoff Analysis

The following tradeoffs were considered and will be explained in the book to help readers make informed decisions for their own projects.

- **Gazebo vs. Unity**:
  - **Tradeoff**: Physics accuracy and ROS integration (Gazebo) vs. photorealistic rendering and graphics capabilities (Unity).
  - **Decision**: Recommend Gazebo for core simulation tasks but provide guidance on how to use Unity for advanced visualization.

- **Cloud Simulation vs. On-Premise RTX Workstation**:
  - **Tradeoff**: Scalability and accessibility (Cloud) vs. low latency and high-fidelity, real-time interaction (On-Premise).
  - **Decision**: Emphasize on-premise for development and control, while positioning the cloud as a tool for heavy-duty, non-real-time training.

- **Edge AI Kit Selection**:
  - **Tradeoff**: Cost and accessibility (e.g., Jetson Orin Nano) vs. maximum performance and I/O (e.g., Jetson AGX Orin).
  - **Decision**: Focus examples on the mid-range Jetson Orin NX, providing notes for scaling up or down.

- **Robot Platform Choice**:
  - **Tradeoff**: Cost and simplicity (Proxy robots like quadrupeds) vs. complexity and human-like interaction (Humanoids).
  - **Decision**: Use a quadruped (Unitree Go2) for most foundational examples due to its lower cost and complexity, but use a humanoid (Unitree G1) for the final capstone to demonstrate the full potential.
