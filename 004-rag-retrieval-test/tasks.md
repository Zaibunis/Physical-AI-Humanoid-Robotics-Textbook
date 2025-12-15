# Tasks: Retrieval Pipeline Testing

**Input**: Design documents from `specs/004-rag-retrieval-test/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup

**Purpose**: Project initialization and basic structure

- [X] T001 Create the file `backend/retrieve.py`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T002 In `backend/retrieve.py`, import necessary libraries (`qdrant_client`, `os`, `dotenv`, `argparse`, `json`).
- [X] T003 In `backend/retrieve.py`, load environment variables from `.env` file using `dotenv`.
- [X] T004 In `backend/retrieve.py`, initialize the Qdrant client using environment variables for the URL and API key.

---

## Phase 3: User Story 1 - Verify Retrieval Accuracy (Priority: P1) 🎯 MVP

**Goal**: Execute a query and get the most relevant document chunks.

**Independent Test**: Run the script with a query and verify the output.

### Implementation for User Story 1

- [X] T005 [US1] In `backend/retrieve.py`, create a function to take a string query as input.
- [X] T006 [US1] In `backend/retrieve.py`, use the Qdrant client to perform a search with the input query.
- [X] T007 [US1] In `backend/retrieve.py`, structure the search results into a list of JSON objects, each containing `content`, `score`, and `metadata`.
- [X] T008 [US1] In `backend/retrieve.py`, implement a main block to parse command-line arguments for the query string.
- [X] T009 [US1] In `backend/retrieve.py`, call the query function and print the resulting JSON to the console.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Validate Metadata Integrity (Priority: P2)

**Goal**: Ensure that retrieved chunks include correct metadata.

**Independent Test**: Inspect the JSON output to confirm that the metadata fields (`url`, `chunk_id`) are present and correct.

### Implementation for User Story 2

- [X] T010 [US2] In `backend/retrieve.py`, add validation within the result formatting loop to ensure the `metadata` dictionary and its keys (`url`, `chunk_id`) exist before including them in the output. Default to `null` or an empty string if missing.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T011 Add error handling in `backend/retrieve.py` for potential `qdrant_client` connection errors.
- [X] T012 Add basic logging in `backend/retrieve.py` to indicate script progress and any errors.
- [X] T013 Add docstrings and comments to the functions in `backend/retrieve.py`.
- [X] T014 Validate the script against the `quickstart.md` documentation.

---

## Dependencies & Execution Order

- **Setup (Phase 1)** must be completed before **Foundational (Phase 2)**.
- **Foundational (Phase 2)** must be completed before **User Story phases (3 & 4)**.
- **User Story 1 (Phase 3)** should be completed before **User Story 2 (Phase 4)**, although they could be developed in parallel after Phase 2.
- **Polish (Phase 5)** can be done after all user stories are complete.
