# Tasks: Integrate RAG Agent with Frontend

**Input**: Design documents from `specs/006-integrate-rag-agent/`

## Phase 1: Setup
- [X] T001 [P] Set up Jest and React Testing Library for the Docusaurus project in `book/`.

## Phase 2: User Story 1 - Ask a question and get an answer (Priority: P1) 🎯 MVP

**Goal**: As a user, I want to ask a question in the UI and see the answer, sources, and matched text chunks so that I can get information from the book.
**Independent Test**: Can be fully tested by entering a question in the UI and verifying that an answer is displayed.

### Implementation for User Story 1
- [X] T002 [US1] Create a new React component for the Q&A interface in `book/src/components/Chatbot/index.tsx`.
- [X] T003 [US1] Add a text input for the question and a submit button to the `Chatbot` component.
- [X] T004 [US1] Implement state management for the `Chatbot` component to handle user input, loading state, and API responses.
- [X] T005 [P] [US1] Create a service to make a POST request to the `/ask` endpoint in `book/src/services/api.ts`.
- [X] T006 [US1] Implement the API call in the `Chatbot` component to send the user's question to the backend.
- [X] T007 [US1] Display a loading indicator in the `Chatbot` component while waiting for the API response.
- [X] T008 [US1] Display the answer, sources, and matched text chunks from the API response in the `Chatbot` component.
- [X] T009 [US1] Display an error message in the `Chatbot` component if the API call fails.
- [X] T010 [US1] Display a "no results found" message in the `Chatbot` component if the API returns an empty response.
- [X] T011 [US1] Add the `Chatbot` component to a page in the Docusaurus site.

## Phase 3: Polish & Cross-Cutting Concerns
- [X] T012 [P] Write unit tests for the `Chatbot` component in `book/src/components/Chatbot/__tests__/index.test.tsx`.
- [X] T013 [P] Write unit tests for the API service in `book/src/services/__tests__/api.test.ts`.

## Dependencies & Execution Order
- **Setup (Phase 1)**: Can start immediately.
- **User Story 1 (Phase 2)**: Depends on Setup completion.
- **Polish (Phase 3)**: Depends on User Story 1 completion.

## Implementation Strategy
1.  Complete Phase 1: Setup.
2.  Complete Phase 2: User Story 1.
3.  Complete Phase 3: Polish.
4.  Demo the feature.
