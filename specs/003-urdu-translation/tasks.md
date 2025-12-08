# Actionable Tasks: Simple Urdu Translation

**Version**: 1.0
**Date**: 2025-12-09

This document breaks down the implementation of the Simple Urdu Translation feature into specific, actionable tasks.

---

## Phase 1: Project Setup

*These tasks initialize the necessary directories and files for the backend service.*

- [ ] T001 Create backend directory at `./backend`
- [ ] T002 Create a basic FastAPI application file at `./backend/main.py`
- [ ] T003 Create a requirements file for backend dependencies at `./backend/requirements.txt`
- [ ] T004 Add `fastapi`, `uvicorn`, and `google-generativeai` to `./backend/requirements.txt`

---

## Phase 2: User Story 1 - Translate Chapter

**User Story**: As a reader, I want to be able to translate any chapter into Urdu so that I can better understand the content.

**Independent Test Criteria**:
*   A "Translate to Urdu" button is visible on a chapter page.
*   Clicking the button displays a loading state.
*   After a short period, the translated Urdu text appears, and a toggle is available to switch between English and Urdu.
*   If the translation fails, an appropriate error message is shown.

### Implementation Tasks

- [ ] T005 [US1] Create a service module in `./backend/services/translation_service.py` to handle Gemini API integration.
- [ ] T006 [US1] Implement the `POST /translate/chapter` endpoint in `./backend/main.py` which uses the translation service.
- [ ] T007 [US1] Implement handling of the `GEMINI_API_KEY` from environment variables in `./backend/main.py`.
- [ ] T008 [P] [US1] Create a new React component for the "Translate to Urdu" button at `./book/src/components/TranslateButton/index.tsx`.
- [ ] T009 [P] [US1] Create a new React component for the toggle view at `./book/src/components/ToggleView/index.tsx`.
- [ ] T010 [US1] Import and add the `TranslateButton` component to a sample chapter page, such as `./book/docs/intro.md`.
- [ ] T011 [US1] Implement the client-side logic in `./book/src/components/TranslateButton/index.tsx` to call the backend API, handle loading/error states, and display the `ToggleView` component with the translated text upon success.

---

## Phase 3: Polish & Documentation

*Finalizing tasks for documentation and testing.*

- [ ] T012 Update the root `README.md` with setup and execution instructions from `specs/003-urdu-translation/quickstart.md`.
- [ ] T013 Perform and validate end-to-end testing by following all steps in `specs/003-urdu-translation/quickstart.md`.

---

## Dependencies & Execution Strategy

*   **Implementation Strategy**: The feature will be implemented as a single Minimum Viable Product (MVP) since there is only one user story.
*   **Dependency Graph**:
    *   Phase 1 (Project Setup) must be completed before Phase 2.
    *   Phase 3 can begin after Phase 2 is complete.
*   **Parallel Opportunities**:
    *   Within Phase 2, the backend tasks (T005, T006, T007) can be worked on in parallel with the frontend component creation (T008, T009). The final frontend integration task (T011) depends on the backend being complete.
