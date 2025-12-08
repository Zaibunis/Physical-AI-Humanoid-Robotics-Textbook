# Implementation Plan: Simple Urdu Translation

**Version**: 1.0
**Status**: Draft
**Author**: Gemini
**Created**: 2025-12-08
**Last Updated**: 2025-12-08

---

## 1. Technical Context

*   **Feature**: Simple Urdu Translation
*   **Description**: This feature allows any user to translate textbook chapters into Urdu via a button click. The translated text is displayed in a toggle view. It is a stateless feature with no user tracking, points, or database persistence.
*   **Actors**: Any user of the textbook website.
*   **Data/State**: This feature is stateless. No data is stored on the server side.
*   **External Dependencies**: The feature depends on the Gemini API for translation services.
*   **Technology Choices**:
    *   **Frontend**: Docusaurus
    *   **Backend**: FastAPI
    *   **Translation**: Gemini API
*   **Unknowns/Risks**:
    *   The reliability and cost of the Gemini API are the primary risks. The plan assumes the API is available and performs within the non-functional requirements.

---

## 2. Constitution Check

*This section will be filled out after the design phase to ensure compliance with project principles.*

---

## 3. Work Breakdown

### 3.1. Frontend (Docusaurus)

1.  **Create UI Components**:
    *   Implement a "Translate to Urdu" button component.
    *   Implement a toggle component to switch between "English" and "اردو" views.
    *   Implement a loading indicator component.
    *   Implement an error message component.

2.  **Chapter Page Integration**:
    *   Add the "Translate to Urdu" button to the top of each chapter page.
    *   Initialize the UI to show the English content by default.

3.  **API Integration**:
    *   Create a client-side function to call the backend `POST /translate/chapter` endpoint.
    *   On button click, this function will be called with the current chapter's content.
    *   Handle the different states:
        *   **Loading**: Display the loading indicator.
        *   **Success**: Pass the translated text to the toggle component and make the toggle view visible.
        *   **Error**: Display the error message component.

### 3.2. Backend (FastAPI)

1.  **API Endpoint**:
    *   Create a `POST /translate/chapter` endpoint.
    *   The endpoint will accept a JSON body with `chapter_id` and `content`.
    *   It will return a JSON object with the translated text.

2.  **Gemini API Integration**:
    *   Create a service module to encapsulate the logic for calling the Gemini API.
    *   Use the official Google AI client library for Python.
    *   The service will take the chapter content as input and use the specified system prompt for translation.
    *   The Gemini API key should be configurable via environment variables.

3.  **Error Handling**:
    *   Implement try-catch blocks to handle potential errors from the Gemini API (e.g., network issues, API errors).
    *   Return appropriate HTTP status codes (e.g., 503 Service Unavailable) and error messages to the frontend.

---

## 4. Timeline / Milestones

*   **Milestone 1 (Days 1-2)**: Frontend UI component implementation (Button, Toggle, Loading/Error states).
*   **Milestone 2 (Day 3)**: Backend API endpoint and Gemini integration setup.
*   **Milestone 3 (Day 4)**: Frontend and backend integration.
*   **Milestone 4 (Day 5)**: End-to-end testing and QA.
*   **Milestone 5 (Day 6)**: Finalize documentation and prepare for deployment.

---

## 5. Deliverables

1.  **Backend**: A fully working `POST /translate/chapter` API endpoint in FastAPI.
2.  **Frontend**: A "Translate to Urdu" button and toggle view integrated into the Docusaurus chapter pages.
3.  **Integration**: A successful connection between the frontend and backend for the translation workflow.
4.  **Documentation**: An updated `quickstart.md` with instructions on how to set up and run the feature locally.