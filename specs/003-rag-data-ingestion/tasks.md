# Actionable Tasks for RAG Data Ingestion Pipeline

This document breaks down the implementation of the RAG Data Ingestion Pipeline into specific, actionable tasks, organized by development phase and user story.

## Phase 1: Project Setup

These tasks initialize the project structure and environment.

- [X] T001 Create the `backend/` directory for the Python code.
- [X] T002 Initialize a new Python project using `uv init` in the root directory.
- [X] T003 Install required Python packages by running `uv pip install cohere qdrant-client requests beautifulsoup4 python-dotenv`.
- [X] T004 Create a `.env` file in the `backend/` directory to store API keys and other secrets.
- [X] T005 Create the main application file at `backend/main.py`.

## Phase 2: Foundational - URL Discovery (User Story 1)

**Goal**: Implement the functionality to discover all relevant content URLs from the sitemap.
**Independent Test**: The `get_all_urls()` function should return a list of URLs pointing only to the documentation pages of the target website.

- [X] T006 [US1] Implement the `get_all_urls()` function in `backend/main.py` to fetch and parse the sitemap from `https://zaibunis.github.io/Physical-AI-Humanoid-Robotics-Textbook/sitemap.xml`.
- [X] T007 [US1] In `get_all_urls()`, filter the extracted URLs to include only those within the `/docs/` path.
- [X] T008 [US1] In `get_all_urls()`, ensure the final list of URLs contains no duplicates.

## Phase 3: Content Extraction (User Story 2)

**Goal**: Implement the functionality to extract clean text from a given URL.
**Independent Test**: The `extract_text_from_url()` function should take a URL, fetch the HTML, and return a clean string containing only the main article text, with HTML tags and boilerplate removed.

- [X] T009 [US2] Implement the `extract_text_from_url(url)` function in `backend/main.py`.
- [X] T010 [US2] Inside `extract_text_from_url()`, use the `requests` library to fetch the HTML content of the given URL.
- [X] T011 [US2] Inside `extract_text_from_url()`, use `BeautifulSoup` to parse the HTML and find the main content `div` with class `theme-doc-markdown markdown`.
- [X] T012 [US2] Extract the text from the content `div` and clean it, removing any remaining unwanted elements.

## Phase 4: Text Processing and Embedding (User Story 3)

**Goal**: Chunk the cleaned text and generate vector embeddings for each chunk.
**Independent Test**: The `chunk_text()` function should correctly split text into segments. The `embed_chunks()` function should return a list of vectors.

- [X] T013 [US3] Implement the `chunk_text(text)` function in `backend/main.py` to split text into segments of 500-1500 tokens while preserving sentence boundaries.
- [X] T014 [US3] Implement a function in `backend/main.py` to initialize and return a Cohere client using the API key from the `.env` file.
- [X] T015 [US3] Implement the embedding logic in `backend/main.py` that takes text chunks and uses the Cohere client to generate embeddings.

## Phase 5: Vector Storage (User Story 4)

**Goal**: Store the generated embeddings and their metadata in the Qdrant vector database.
**Independent Test**: The `save_chunk_to_qdrant()` function should successfully upsert a batch of points (vectors + payloads) into the specified Qdrant collection.

- [X] T016 [US4] Implement a function in `backend/main.py` to initialize and return a Qdrant client using the credentials from the `.env` file.
- [X] T017 [US4] Implement the `create_collection("rag_embeddings")` logic in `backend/main.py` to set up the Qdrant collection with the correct vector size and distance metric.
- [X] T018 [US4] Implement the `save_chunk_to_qdrant(chunks, embeddings)` function in `backend/main.py` to prepare and upsert batches of points with UUIDs and metadata.

## Phase 6: Polish & Finalization

**Goal**: Integrate all parts into a cohesive pipeline, add documentation, and perform final validation.

- [X] T019 Implement the `main()` function in `backend/main.py` to orchestrate the end-to-end pipeline: get URLs -> extract text -> chunk -> embed -> upsert.
- [X] T020 Add logging to the `main()` function to track progress, including counts of processed items, failures, and retries.
- [X] T021 Implement a mechanism in `main()` to prevent duplicate ingestion of content on subsequent runs.
- [X] T022 Add a validation step after ingestion to perform a test similarity search and confirm the number of uploaded vectors.
- [X] T023 Write the `backend/README.md` file with instructions on setup, environment variables, and how to run the pipeline.

## Dependencies & Execution Order

The user stories must be implemented in order, as they are dependent on each other.

1.  **User Story 1 (URL Discovery)**: Must be completed first as it provides the input for the entire pipeline.
2.  **User Story 2 (Content Extraction)**: Depends on US1.
3.  **User Story 3 (Embedding)**: Depends on US2.
4.  **User Story 4 (Vector Storage)**: Depends on US3.

## Parallel Execution Opportunities

Within each user story, some tasks can be parallelized, but the primary parallelization opportunity is in the final pipeline execution:

-   Fetching HTML from multiple URLs can be done concurrently.
-   Generating embeddings for multiple chunks can be done in parallel batches.

However, for this initial implementation, a sequential execution within a single script is sufficient.
