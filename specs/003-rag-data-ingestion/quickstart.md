# Quickstart: RAG Data Ingestion Pipeline

This guide explains how to set up and run the data ingestion pipeline.

## 1. Prerequisites

- Python 3.8+ installed.
- `uv` package manager installed (`pip install uv`).

## 2. Setup

1.  **Initialize the project**:
    Open your terminal in the root of this repository and run:
    ```bash
    uv init
    ```
    This will create a `pyproject.toml` file.

2.  **Install dependencies**:
    ```bash
    uv pip install requests beautifulsoup4 cohere-python qdrant-client python-dotenv
    ```

3.  **Create `.env` file**:
    In the `backend` directory, create a new file named `.env` and add your API keys and Qdrant URL:
    ```
    COHERE_API_KEY="your_cohere_api_key"
    QDRANT_API_KEY="your_qdrant_api_key"
    QDRANT_URL="your_qdrant_cluster_url"
    ```

## 3. Running the Pipeline

To run the entire ingestion pipeline, execute the `main.py` script:
```bash
python backend/main.py
```
The script will then:
1.  Crawl the textbook website.
2.  Extract and clean the content.
3.  Generate embeddings using Cohere.
4.  Upsert the data into your Qdrant collection.
