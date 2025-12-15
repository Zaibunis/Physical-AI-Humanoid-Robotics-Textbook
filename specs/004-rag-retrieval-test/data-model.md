# Data Model for Retrieval Pipeline Testing

This document outlines the data entities involved in the retrieval testing feature, as defined in the feature specification.

## Key Entities

### Query
-   **Description**: A text string representing the user's information need.
-   **Attributes**:
    -   `text`: string

### RetrievedChunk
-   **Description**: A segment of text from an original document that is returned by the retrieval system.
-   **Attributes**:
    -   `content`: string - The text content of the chunk.
    -   `score`: float - The similarity score of the chunk with respect to the query.

### Metadata
-   **Description**: Information associated with a document chunk.
-   **Attributes**:
    -   `url`: string - The URL of the original source document.
    -   `chunk_id`: integer - A unique identifier for the chunk within the document.
