# RAG Data Ingestion Pipeline

This directory contains the Python script for the RAG data ingestion pipeline.

## Setup

1.  **Install dependencies**:
    Make sure you have Python 3.8+ and `uv` installed. Then, run the following command from the root of the repository to install the required packages:
    ```bash
    uv pip install -r requirements.txt
    ```
    *(Note: You will need to generate a `requirements.txt` file from the `pyproject.toml` if you don't have one)*

2.  **Environment Variables**:
    Create a `.env` file in this directory with the following content:
    ```
    COHERE_API_KEY="your_cohere_api_key"
    QDRANT_API_KEY="your_qdrant_api_key"
    QDRANT_URL="your_qdrant_cluster_url"
    ```

## Running the Pipeline

To run the data ingestion pipeline, execute the `main.py` script:
```bash
python main.py
```

The script will:
- Fetch all content URLs from the sitemap.
- For each URL, extract the text, chunk it, generate embeddings, and store them in Qdrant.
- Skip any URLs that have already been processed in previous runs.
- Perform a validation step at the end to confirm the ingestion.
