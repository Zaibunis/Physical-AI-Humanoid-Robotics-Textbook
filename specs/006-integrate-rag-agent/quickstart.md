# Quickstart

This document provides a quick overview of how to get started with the implementation of the Q&A feature.

## Frontend

The frontend is a Docusaurus site. The new Q&A interface will be a React component within the existing Docusaurus application.

### Getting Started

1.  Navigate to the `book` directory.
2.  Install the dependencies: `npm install`
3.  Start the development server: `npm start`

### Implementation Details

-   Create a new React component for the Q&A interface in `src/components`.
-   Use `fetch` or `axios` to make a POST request to the `/ask` endpoint.
-   Display the response from the API in the UI.

## Backend

The backend is a Python application that provides the `/ask` endpoint. The implementation of the RAG agent is already complete.

### Getting Started

1.  Navigate to the `backend` directory.
2.  Install the dependencies: `pip install -r requirements.txt`
3.  Start the backend server: `python main.py`
