# Implementation Plan: RAG Data Ingestion Pipeline

**Feature Spec**: [spec.md](./spec.md)  
**Branch**: `003-rag-data-ingestion`

## Technical Context

This plan outlines the technical design for an automated pipeline to ingest content from the Physical AI & Humanoid Robotics textbook website into a Qdrant vector database.

- **Objective**: Create a script that crawls the website, cleans the content, generates embeddings with Cohere, and stores them in Qdrant.
- **Technology Stack**:
    - **Language**: Python
    - **Package Management**: uv
    - **HTTP Requests**: `requests` library
    - **HTML Parsing**: `beautifulsoup4` library
    - **Embeddings**: `cohere` library
    - **Vector Database**: `qdrant-client` library
- **Target URL**: `https://zaibunis.github.io/Physical-AI-Humanoid-Robotics-Textbook/` (specifically the `/docs` section)
- **SITEMAP URL**: `https://zaibunis.github.io/Physical-AI-Humanoid-Robotics-Textbook/sitemap.xml` (specifically the `/docs` section)

## Constitution Check

- ✅ **Spec-Driven Development**: This plan is derived directly from an approved spec.
- ✅ **Verifiable & Testable Content**: The pipeline's output (ingested data) can be verified. The script itself will be testable.
- ✅ **Practicality & Real-World Focus**: The project uses industry-standard libraries for a practical RAG application.
- ✅ **Clarity and Precision**: The plan defines a clear, precise set of functions and technologies.

## Phase 0: Outline & Research

The primary goal of this phase is to confirm the libraries and methods for each step of the pipeline.

- **Research Tasks**:
    1.  **URL Discovery**: Determine the best strategy to find all URLs within the `/docs` section of the Docusaurus site. This will likely involve fetching the main page and parsing `<a>` tags.
    2.  **Text Extraction**: Investigate the HTML structure of the target website to identify the main content container (e.g., `<article>` or a `div` with a specific class) to reliably extract clean text.
    3.  **Text Chunking**: Research best practices for splitting the extracted text into manageable chunks for the Cohere embedding model.
    4.  **Library APIs**: Review the documentation for `requests`, `beautifulsoup4`, `cohere`, and `qdrant-client` to confirm the functions needed.
- **Output**: `research.md` detailing the chosen approach for each task.

## Phase 1: Design & Contracts

### System Design

The entire pipeline will be implemented in a single `main.py` file within a `backend` directory.

- **Project Structure**:
    ```
    .
    ├── backend/
    │   ├── main.py
    │   └── .env
    └── pyproject.toml
    ```
- **Core Functions in `main.py`**:
    - `get_all_urls(base_url)`: Crawls the site starting from the base URL and returns a list of all URLs in the `/docs` section.
    - `extract_text_from_url(url)`: Fetches the HTML from a URL and uses BeautifulSoup to extract and return the clean text content.
    - `chunk_text(text)`: Takes a long text and splits it into smaller chunks suitable for the embedding model.
    - `get_cohere_client()`: Initializes and returns a Cohere client instance.
    - `get_qdrant_client()`: Initializes and returns a Qdrant client instance.
    - `embed_chunks(chunks, cohere_client)`: Generates embeddings for a list of text chunks using the Cohere client.
    - `upsert_to_qdrant(qdrant_client, collection_name, embeddings, chunks)`: Creates the collection if it doesn't exist and upserts the embeddings and their corresponding text chunks as metadata.
    - `main()`: The main function that orchestrates the entire pipeline by calling the other functions in sequence.

### Data Model

The data model will be formally documented in `data-model.md`, based on the entities defined in the spec.

### API Contracts

This is a backend data pipeline with no external-facing API. Therefore, no OpenAPI or GraphQL contracts will be created.

### Quickstart Guide

A `quickstart.md` file will be created to document:
- How to set up the Python environment using `uv`.
- How to create a `.env` file with the required API keys for Cohere and Qdrant.
- The command to run the pipeline.

**Output**: `research.md`, `data-model.md`, `quickstart.md`.