---
sidebar_position: 1
---

# Chapter 4.1: Voice to Text with Whisper

The ultimate goal of robotics is to create machines that can collaborate with humans naturally. The most natural human interface is language. To build a robot that can understand spoken commands, the first step is to convert the sound of a human voice into written text. This process is called Automatic Speech Recognition (ASR).

This chapter introduces OpenAI's **Whisper**, a state-of-the-art, open-source ASR system. We'll discuss how it works, how to run it, and how to integrate it into a ROS 2 system to create a node that listens for commands.

## What is Whisper?

Whisper is a family of pre-trained ASR models released by OpenAI in 2022. It was trained on a massive and diverse dataset of 680,000 hours of multilingual and multitask supervised data collected from the web. This vast training data makes Whisper incredibly robust and accurate across a wide range of languages, accents, and acoustic conditions.

### Key Features of Whisper:

-   **Multilingual**: It supports transcription in dozens of languages and can even translate from those languages into English.
-   **Robustness**: It performs well even with background noise, accents, and technical jargon, which is a significant advantage over many older ASR systems.
-   **Open Source**: The models and the inference code are open source, allowing us to run them locally on our own hardware without relying on a cloud service. This is critical for robotics, where latency and internet connectivity can be issues.
-   **Multiple Model Sizes**: Whisper comes in various sizes, from `tiny` (39 million parameters) to `large` (1.55 billion parameters). This allows us to choose a model that fits our hardware constraints.
    -   Smaller models are faster but less accurate.
    -   Larger models are more accurate but require more computational resources (ideally a GPU).

## How to Use Whisper

Using Whisper in Python is remarkably simple thanks to the official `openai-whisper` package.

1.  **Installation**:
    ```bash
    pip install -U openai-whisper
    # For GPU-accelerated transcription (highly recommended)
    pip install -U torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
    ```
    You will also need `ffmpeg` installed on your system: `sudo apt update && sudo apt install ffmpeg`.

2.  **Basic Transcription**:
    The core of the library is the `whisper.transcribe()` function.

    ```python
    import whisper

    # Load a model (e.g., 'base', 'medium', 'large')
    model = whisper.load_model("base.en") # '.en' for English-only model

    # Transcribe an audio file
    result = model.transcribe("path/to/my/audio_file.wav")

    # Print the result
    print(result["text"])
    ```

The `transcribe` function handles all the complexity: it loads the audio, splits it into 30-second chunks, runs the neural network, and returns the transcribed text.

## Creating a Voice-to-Text ROS 2 Node

To use Whisper in our robotics project, we need to create a ROS 2 node that can:
1.  Access the microphone audio stream.
2.  Listen for a user to speak.
3.  Capture the spoken audio.
4.  Use Whisper to transcribe the audio into text.
5.  Publish the resulting text to a ROS 2 topic for other nodes (like our planner) to use.

### Capturing Microphone Audio

Accessing microphone data in Python can be done with libraries like `sounddevice` or `pyaudio`. The process generally involves:
1.  Opening an audio stream from the default microphone device.
2.  Continuously reading chunks of audio data (as NumPy arrays).
3.  Implementing a simple voice activity detection (VAD) algorithm. A basic VAD can work by monitoring the energy (root mean square) of the audio chunks. When the energy surpasses a certain threshold, we start recording. When it drops below the threshold for a certain duration, we stop recording.

### The ROS 2 Node Structure

Here is a conceptual outline of our `voice_commander` node:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import whisper
import sounddevice as sd
import numpy as np
# Other necessary imports for audio handling...

class VoiceCommanderNode(Node):
    def __init__(self):
        super().__init__('voice_commander_node')
        
        # Publisher for the transcribed command
        self.command_publisher_ = self.create_publisher(String, 'recognized_command', 10)
        
        # Load the Whisper model
        self.model = whisper.load_model("base.en")
        
        # Audio stream parameters
        self.samplerate = 16000 # Whisper was trained on 16kHz audio
        self.channels = 1
        
        # VAD parameters
        self.energy_threshold = 1000
        self.silence_duration = 1.0 # seconds
        
        # Start listening
        self.start_listening()
        self.get_logger().info("Voice commander node started. Say a command!")

    def start_listening(self):
        # This is a simplified representation.
        # A real implementation would use a callback-based audio stream.
        # It would continuously listen, detect speech, record it,
        # and then call self.process_audio() on the recording.
        pass

    def process_audio(self, audio_data_np):
        """
        Transcribe the captured audio and publish the command.
        """
        self.get_logger().info("Processing speech...")
        
        # Transcribe using Whisper
        # Note: audio_data_np needs to be in the correct format (float32)
        result = self.model.transcribe(audio_data_np, fp16=False) # fp16=False for CPU
        
        transcribed_text = result["text"].strip()
        
        if transcribed_text:
            self.get_logger().info(f'Whisper transcribed: "{transcribed_text}"')
            
            # Publish the command
            msg = String()
            msg.data = transcribed_text
            self.command_publisher_.publish(msg)
        else:
            self.get_logger().info("Whisper could not transcribe any text.")

# main() function as before
```

When this node is running, it will constantly listen to the microphone. When you speak a command, it will record the audio, send it to Whisper for transcription, and the resulting text (e.g., "robot, pick up the red block") will be published on the `/recognized_command` topic.

## Summary

OpenAI's Whisper provides a powerful, robust, and open-source solution for converting speech to text. By integrating it into a ROS 2 node that listens to a microphone, we can create the first link in our Vision-Language-Action chain: a voice interface for our robot. The text commands published by this node will be the input for the next stage of our system: the planning and reasoning LLM.