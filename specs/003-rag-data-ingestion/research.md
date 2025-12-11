# Research for RAG Data Ingestion Pipeline

This document outlines the decisions made for the implementation of the data ingestion pipeline.

## 1. URL Discovery

- **Decision**: Use `requests` to fetch the HTML of the base URL and `BeautifulSoup` to parse it. We will find all `<a>` tags and filter for relative links that start with `/Physical-AI-Humanoid-Robotics-Textbook/docs/`. These relative links will be joined with the base URL `https://zaibunis.github.io` to form the complete URLs.
- **Rationale**: This is a standard and effective way to crawl a website. It avoids the need for more complex tools like Scrapy for this simple use case.
- **Alternatives Considered**:
    - **Sitemap**: Check for a `sitemap.xml` file. This is often the most efficient way to get all URLs, but it's not guaranteed to exist or be up-to-date. We will start with crawling and can add sitemap parsing later if needed.

## 2. Text Extraction

- **Decision**: After inspecting the target website, the main content is within an `<article>` tag which in turn is inside a `<div>` with the class `theme-doc-markdown markdown`. We will target this `div` to extract the text.
- **Rationale**: Targeting a specific, stable class name or tag is more robust than relying on the overall document structure.
- **Alternatives Considered**:
    - **Generic Text Extraction**: Use a library that attempts to automatically extract the main content of a page. This can be less reliable than a targeted approach.

## 3. Text Chunking

- **Decision**: We will use a simple text chunking strategy based on a fixed character length with some overlap. For example, 1000 characters per chunk with a 200-character overlap.
- **Rationale**: This is a common and effective strategy for preparing text for embedding models.
- **Alternatives Considered**:
    - **Sentence-based chunking**: Splitting the text by sentences. This can be more semantically meaningful but can result in very uneven chunk sizes.
    - **Recursive chunking**: A more advanced technique that recursively splits the text by different separators. This is more complex to implement and might be overkill for this project.

## 4. Libraries and APIs

- **`requests`**: Use `requests.get(url).text` to fetch the HTML content.
- **`beautifulsoup4`**: Use `BeautifulSoup(html, 'html.parser')` to parse the HTML. Then use `soup.find('div', class_='theme-doc-markdown markdown')` to get the content div, and `.get_text()` to extract the text.
- **`cohere`**: Use `cohere.Client(api_key)` to initialize the client. Then use `client.embed(texts=chunks, model='embed-english-light-v2.0')` to get the embeddings.
- **`qdrant-client`**: Use `qdrant_client.QdrantClient(url=qdrant_url, api_key=qdrant_api_key)` to initialize the client. Use `client.recreate_collection()` to create the collection and `client.upsert()` to add the points.
- **`uv`**: To initialize the project, we will run `uv init`. To install packages, we will run `uv pip install requests beautifulsoup4 cohere-python qdrant-client python-dotenv`.
