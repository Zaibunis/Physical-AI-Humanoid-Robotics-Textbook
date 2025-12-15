# Quickstart: Using the Retrieval-Enabled Agent

This guide provides the basic steps for a developer to use the Retrieval-Enabled Agent to answer questions based on content in a Qdrant vector store.

## Prerequisites

1.  Python 3.9+ installed.
2.  A running Qdrant instance populated with a collection of text embeddings.
3.  The following environment variables must be set:
    -   `OPENAI_API_KEY`: Your secret key for the OpenAI API.
    -   `QDRANT_URL`: The URL of your Qdrant instance (e.g., `http://localhost:6333`).
    -   `QDRANT_API_KEY`: Your API key for Qdrant, if required.
    -   `QDRANT_COLLECTION_NAME`: The name of the collection to search within.

## Installation

Install the necessary Python libraries:

```bash
pip install openai qdrant-client python-dotenv
```

## Running the Agent

The agent is exposed as a single function in `backend/agent.py`.

### Example Usage

1.  **Create the `main.py` file**:
    Create a file named `main.py` at the root of the project to interact with the agent.

    ```python
    import os
    from dotenv import load_dotenv
    from backend.agent import ask_question

    # Load environment variables from .env file
    load_dotenv()

    def main():
        # Example question
        question = "What is the difference between Isaac Sim and Isaac ROS?"

        print(f"Asking question: {question}")

        # Get the answer from the agent
        answer = ask_question(question)

        print("\nReceived Answer:")
        print(answer)

    if __name__ == "__main__":
        main()

    ```

2.  **Ensure `backend/agent.py` exists** (this file will be created during the implementation phase):
    This file will contain the core logic for the agent, including the `ask_question` function.

3.  **Run the application**:
    Execute the `main.py` script from your terminal.

    ```bash
    python main.py
    ```

### Expected Output

The script will print the answer synthesized by the agent based on the content retrieved from Qdrant.

```
Asking question: What is the difference between Isaac Sim and Isaac ROS?

Received Answer:
Isaac Sim is a robotics simulation platform that allows for the creation and testing of virtual robots in realistic environments. Isaac ROS, on the other hand, is a collection of ROS 2 packages that provide hardware acceleration for perception, navigation, and manipulation tasks on NVIDIA hardware. In essence, you can develop a robot in Isaac Sim and then deploy it using the accelerated packages from Isaac ROS on a physical robot.
```
