# Quickstart for Retrieval Pipeline Testing

This guide explains how to run the retrieval testing script.

## Prerequisites

-   Python 3.11 installed.
-   Dependencies installed from `requirements.txt`.
-   A running Qdrant instance with a populated collection.
-   A `.env` file with the Qdrant URL and API key.

## Running the Script

1.  Navigate to the `backend` directory.
2.  Run the script with a query:
    ```bash
    python retrieve.py "your query here"
    ```
3.  The script will print a JSON object containing the top-k retrieved chunks.

## Example

```bash
python retrieve.py "What is reinforcement learning?"
```

**Example Output:**
```json
[
  {
    "content": "Reinforcement learning is a machine learning training method based on rewarding desired behaviors...",
    "score": 0.98,
    "metadata": {
      "url": "http://example.com/rl-intro",
      "chunk_id": 3
    }
  }
]
```
