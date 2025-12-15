# Book Writing Project

This repository contains the various components for the book writing project, including:
- `backend/`: Backend services and logic.
- `book/`: Docusaurus documentation site for the book.
- `specs/`: Specification documents.

## Retrieval-Enabled Agent

This agent is designed to answer questions strictly based on content indexed in a Qdrant vector database.

### Setup

1.  **Environment Variables**: Create a `.env` file in the root directory of the project with the following variables:
    ```
    OPENAI_API_KEY="your_openai_api_key_here"
    QDRANT_URL="http://localhost:6333" # Or your Qdrant instance URL
    QDRANT_API_KEY="your_qdrant_api_key_here" # Your Qdrant API key if authentication is enabled
    QDRANT_COLLECTION_NAME="your_qdrant_collection_name_here" # The name of your Qdrant collection
    ```
2.  **Install Dependencies**: Navigate to the `backend/` directory and install the required Python packages:
    ```bash
    cd backend/
    pip install -r requirements.txt
    ```
    (Note: ensure you have `python-dotenv` installed in your environment if it's not in `requirements.txt`)

### Usage

To ask a question using the agent, run the `main.py` script:

```bash
python backend/main.py
```

You can modify the `question` variable in `backend/main.py` to ask different questions.
