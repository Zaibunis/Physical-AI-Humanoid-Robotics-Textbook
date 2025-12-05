---
sidebar_position: 3
---

# Chapter 4.3: Object Recognition with Vision Models

The LLM has given our robot a plan, for example: `find_object(object_name='apple', color='green')`. Now, the robot needs to execute this step. To do this, it must visually search its environment and identify the correct object. This is the task of **object recognition**.

While we can use pre-built detectors from Isaac ROS, a modern VLA (Vision-Language-Action) system often uses a more flexible type of model: a **Vision-Language Model (VLM)** or a **CLIP-style model**. These models can understand objects based on natural language descriptions rather than just a fixed set of pre-trained categories.

This chapter explains how these models work and how to create a ROS 2 service that uses a VLM to find objects based on text descriptions.

## Beyond Bounding Boxes: Open-Vocabulary Detection

Traditional object detectors (like YOLO) are trained to recognize a fixed set of object classes (e.g., "person", "car", "dog"). If you want to detect a "red apple" but the model was only trained on "apple", it can't help you. This is known as **closed-set** or **closed-vocabulary** detection.

For a general-purpose robot, we need **open-vocabulary detection**. We want to be able to describe any object using natural language and have the robot find it. This is where models like CLIP (Contrastive Language-Image Pre-Training) excel.

### How CLIP Works

CLIP is trained on millions of (image, text) pairs from the internet. It learns to embed both the image and the text into a shared **multimodal embedding space**. In this space, similar concepts are close together.

-   An image of a cat will be embedded near the text "a photo of a cat."
-   An image of an apple will be embedded near the text "a green apple."
-   An image of a cat will be far away from the text "a photo of a car."

We can use this property to perform open-vocabulary object detection. A common approach is to:

1.  **Get an Image**: Take an image from the robot's camera.
2.  **Propose Regions**: Use a traditional, class-agnostic algorithm to propose several potential object regions or "bounding boxes" in the image.
3.  **Create Text Queries**: For the command `find_object(object_name='apple', color='green')`, create text queries like "a green apple," "an apple," "a green object," etc.
4.  **Embed and Compare**:
    a.  For each proposed bounding box, crop the image and embed it using CLIP's image encoder.
    b.  Embed all the text queries using CLIP's text encoder.
    c.  Calculate the **cosine similarity** between each cropped image embedding and each text query embedding.
5.  **Find the Best Match**: The bounding box whose embedding has the highest similarity to the "green apple" text embedding is our target object.

This process allows the robot to find objects based on arbitrary descriptions, making it far more flexible than a detector with a fixed class list.

## Creating a ROS 2 Vision Service

Instead of having a node that constantly publishes detections, it makes more sense to create a **ROS 2 service**. Our LLM planner node will act as the client, calling the vision service only when it needs to find an object.

The service definition might look like this:

**`FindObject.srv`**
```
# Request
string object_name
string color
---
# Response
bool success
int32 object_id
geometry_msgs/PoseStamped pose # The 3D position of the object
```

### The Vision Service Node

Here is a conceptual outline for our `vision_service_node`.

```python
import rclpy
from rclpy.node import Node
from my_interfaces.srv import FindObject # Our custom service interface
from sensor_msgs.msg import Image, PointCloud2
from cv_bridge import CvBridge
# Imports for a CLIP model (e.g., from Hugging Face's transformers library)
# Imports for a region proposal algorithm (e.g., OpenCV)

class VisionServiceNode(Node):
    def __init__(self):
        super().__init__('vision_service_node')
        
        # Service server
        self.srv = self.create_service(
            FindObject,
            'find_object_service',
            self.find_object_callback)
            
        # Subscribe to camera and point cloud topics
        # We need both to get the 2D image and the 3D location
        self.image_sub = self.create_subscription(
            Image, '/my_robot/camera/image_raw', self.image_callback, 10)
        self.point_cloud_sub = self.create_subscription(
            PointCloud2, '/my_robot/camera/points', self.points_callback, 10)
            
        self.bridge = CvBridge()
        # Load CLIP model here
        # self.clip_model = ...
        # self.clip_processor = ...

        self.latest_image = None
        self.latest_point_cloud = None
        self.get_logger().info("Vision Service node started.")

    def image_callback(self, msg):
        self.latest_image = msg

    def points_callback(self, msg):
        self.latest_point_cloud = msg

    def find_object_callback(self, request, response):
        self.get_logger().info(
            f"Received request to find a '{request.color} {request.object_name}'")
            
        if self.latest_image is None or self.latest_point_cloud is None:
            response.success = False
            self.get_logger().error("No image or point cloud data available.")
            return response
            
        # Convert ROS Image to an OpenCV image
        cv_image = self.bridge.imgmsg_to_cv2(self.latest_image, 'bgr8')
        
        # --- This is the core logic ---
        # 1. Propose bounding box regions in cv_image.
        # 2. Create text queries (e.g., f"a {request.color} {request.object_name}").
        # 3. For each box, crop the image, run CLIP on the crop and the text.
        # 4. Find the box with the highest similarity score.
        # 5. Find the center pixel (u, v) of the best bounding box.
        # 6. Using the latest_point_cloud data, look up the 3D (x, y, z) coordinate
        #    corresponding to the pixel (u, v). This gives the object's 3D pose.
        
        # --- For this example, we'll assume we found it ---
        best_box_found = True
        if best_box_found:
            response.success = True
            response.object_id = 123 # A unique ID for the found object
            # response.pose = ... # Fill in the 3D pose from the point cloud
            self.get_logger().info("Object found successfully.")
        else:
            response.success = False
            self.get_logger().info("Could not find the requested object.")
            
        return response

# main() function as before
```

When the LLM planner reaches the `find_object` step, it makes a service call to this node with the parameters `object_name='apple'` and `color='green'`. The vision node then performs the visual search and returns whether it was successful and, if so, the 3D location of the object.

## Summary

Modern Vision-Language Models like CLIP allow our robot to perform flexible, open-vocabulary object recognition. By wrapping a VLM in a ROS 2 service, we create a powerful, on-demand perception capability. This service can be called directly by our LLM-based planner, enabling the robot to find objects based on natural language descriptions. This combination of language-driven planning and language-driven vision is the essence of a Vision-Language-Action model. The final step is to take the output of these systems and execute physical actions.