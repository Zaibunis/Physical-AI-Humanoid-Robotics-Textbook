---
sidebar_position: 3
---

# Chapter 1.3: The Python Bridge: `rclpy` for AI Agents

While ROS 2 is built on a C++ core for performance, its real power for AI development comes from its Python client library, `rclpy`. This library allows us to write full-fledged ROS 2 nodes in Python, giving us access to the vast ecosystem of Python libraries for machine learning, computer vision, and language processing (e.g., TensorFlow, PyTorch, OpenCV, Hugging Face).

This chapter covers the essentials of creating a ROS 2 node in Python, subscribing to topics, publishing messages, and setting up the structure for our AI agents.

## Setting Up a Python ROS 2 Package

To keep our code organized, we create a ROS 2 package.

1.  **Navigate to your workspace's `src` directory**:
    ```bash
    cd your_ros2_ws/src
    ```

2.  **Create the package**:
    ```bash
    ros2 pkg create --build-type ament_python --node-name ai_agent my_ai_pkg
    ```
    -   `--build-type ament_python`: Specifies this is a Python package.
    -   `--node-name ai_agent`: Creates a basic executable node named `ai_agent`.
    -   `my_ai_pkg`: The name of your new package.

This creates a directory `my_ai_pkg` with a `setup.py`, `package.xml`, and a resource folder. The initial node script will be in `my_ai_pkg/my_ai_pkg/ai_agent.py`.

## Writing a Basic `rclpy` Node

A ROS 2 node in Python is a class that inherits from `rclpy.node.Node`. Let's examine a simple "listener" node that subscribes to a topic.

```python
# ai_agent.py

import rclpy
from rclpy.node import Node
from std_msgs.msg import String # Import the String message type

class AIAgentNode(Node):
    """
    A simple ROS 2 node that subscribes to a topic.
    """
    def __init__(self):
        # Initialize the Node with a name
        super().__init__('ai_agent_node')
        
        # Create a subscriber
        # The subscriber listens to the 'chatter' topic for String messages
        # and calls the 'listener_callback' function for each message.
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback,
            10) # The '10' is the QoS (Quality of Service) history depth
        self.get_logger().info('AI Agent node has been started and is listening.')

    def listener_callback(self, msg):
        """
        This function is called every time a message is received.
        """
        # Log the received message
        self.get_logger().info(f'I heard: "{msg.data}"')

def main(args=None):
    # Initialize the rclpy library
    rclpy.init(args=args)
    
    # Create an instance of our node
    ai_agent_node = AIAgentNode()
    
    try:
        # Spin the node so it can process callbacks
        # This keeps the node alive until it's shut down
        rclpy.spin(ai_agent_node)
    except KeyboardInterrupt:
        pass
    finally:
        # Cleanly destroy the node and shut down rclpy
        ai_agent_node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Key `rclpy` Components

-   **`rclpy.init()`**: Initializes the ROS 2 communication system. Must be the first thing called.
-   **`rclpy.shutdown()`**: Shuts down the communication system.
-   **`rclpy.node.Node`**: The base class for all Python nodes.
-   **`super().__init__('node_name')`**: The constructor for the `Node` class, which registers the node with the ROS graph.
-   **`self.create_subscription(...)`**: Creates a subscriber.
    -   `message_type`: The type of message the topic uses.
    -   `topic_name`: The name of the topic to subscribe to.
    -   `callback_function`: The function to call when a message is received.
    -   `qos_profile`: Quality of Service settings. A simple integer sets the history depth.
-   **`self.create_publisher(...)`**: Creates a publisher (see next section).
-   **`self.get_logger()`**: A built-in logger for printing messages to the console and log files.
-   **`rclpy.spin(node)`**: Enters a loop, processing callbacks (like message arrivals) for the node until the node is shut down.

## Publishing Messages

Let's add a publisher to our node. This node will publish a status message every second.

```python
# ai_agent.py (with publisher)

import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class AIAgentNode(Node):
    def __init__(self):
        super().__init__('ai_agent_node')
        
        # Publisher
        self.publisher_ = self.create_publisher(String, 'agent_status', 10)
        
        # Timer to trigger publishing
        timer_period = 1.0  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        
        self.get_logger().info('AI Agent node has been started.')

    def timer_callback(self):
        """
        This function is called periodically by the timer.
        """
        msg = String()
        msg.data = f'AI Agent is active at {self.get_clock().now()}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')

# ... (main function remains the same)
```

### New Components

-   **`self.create_publisher(message_type, topic_name, qos_profile)`**: Creates an object that can publish messages to a topic.
-   **`self.create_timer(period, callback_function)`**: A convenient way to trigger a function at a regular interval (in seconds).
-   **`self.publisher_.publish(msg)`**: Sends the message object over the topic.
-   **`self.get_clock().now()`**: Gets the current ROS time.

## Running Your Python Node

1.  **Build the package**:
    From the root of your workspace (`your_ros2_ws`), run:
    ```bash
    colcon build --packages-select my_ai_pkg
    ```

2.  **Source the workspace**:
    ```bash
    source install/setup.bash
    ```

3.  **Run the node**:
    ```bash
    ros2 run my_ai_pkg ai_agent
    ```

You can now use `ros2 topic list`, `ros2 topic echo <topic_name>`, and `ros2 node info /ai_agent_node` to inspect your running node.

## Summary

`rclpy` provides the essential bridge between the high-performance ROS 2 core and the rich, flexible Python ecosystem. By creating nodes, publishers, and subscribers, we can build a modular system where our AI logic can easily communicate with the robot's hardware drivers, sensors, and actuators. This structure is fundamental to the projects we will build in the upcoming modules.