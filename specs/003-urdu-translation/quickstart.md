# Quickstart: Simple Urdu Translation

This guide provides instructions to set up and run the Simple Urdu Translation feature locally.

## Prerequisites

*   Node.js and npm
*   Python 3.8+ and pip
*   A valid Gemini API Key

## Backend Setup (FastAPI)

1.  **Navigate to the backend directory** (assuming it will be created at the root, e.g., `./backend`):
    ```bash
    cd backend
    ```

2.  **Create a virtual environment and install dependencies**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```
    *(Note: `requirements.txt` will be created during implementation)*

3.  **Set up environment variables**:
    Create a `.env` file in the `backend` directory and add your Gemini API key:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

4.  **Run the backend server**:
    ```bash
    uvicorn main:app --reload
    ```
    The server will be running at `http://127.0.0.1:8000`.

## Frontend Setup (Docusaurus)

1.  **Navigate to the Docusaurus directory**:
    ```bash
    cd book
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the frontend development server**:
    ```bash
    npm start
    ```
    The website will be available at `http://localhost:3000`.

## How to Test

1.  Ensure both the backend and frontend servers are running.
2.  Open your browser and navigate to a chapter page on the Docusaurus site (e.g., `http://localhost:3000/docs/intro`).
3.  Click the "Translate to Urdu" button.
4.  Verify that the content is translated and can be toggled.
