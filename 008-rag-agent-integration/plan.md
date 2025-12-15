# Implementation Plan: RAG Agent Frontend Integration

**Feature**: RAG Agent Frontend Integration
**Branch**: 008-rag-agent-integration
**Created**: 2025-12-15
**Status**: Draft

## Technical Context

This plan outlines the integration of the existing backend RAG Agent with the Docusaurus frontend. The backend provides an `/ask` endpoint that returns structured responses with answers, sources, and matched text chunks. The frontend is built with Docusaurus/React and needs a chat UI component to interact with the backend API.

### Known Components

- **Backend**: FastAPI application with `/ask` endpoint (backend/api.py)
- **Frontend**: Docusaurus site in book/ directory
- **API Response Structure**: QueryResponse with answer, sources, matched_chunks, error, status
- **API Request Structure**: QueryRequest with query string

### Dependencies

- FastAPI backend server running on localhost:8000
- Docusaurus frontend running on localhost:3000
- CORS middleware configured in backend for local development

### Integration Points

- Frontend will make POST requests to `http://localhost:8000/ask`
- Response will be displayed in a chat UI component
- Loading states, error handling, and empty responses need to be supported

## Constitution Check

### Alignment with Project Principles

- **Minimal Changes**: Plan focuses on adding only the necessary UI components without redesigning the entire UI
- **Clean API Requests**: Implementation will use clean, minimal API requests to the backend
- **Connection Focus**: Implementation focuses on frontend-backend connection, not new backend logic
- **User Experience**: Proper loading states, error handling, and response display as specified

### Potential Violations

- **Backend Dependencies**: Using existing backend API without modifications (aligned with constraints)
- **UI Changes**: Adding new UI component in specific location (bottom right) as requested

## Research Findings

### Backend API Analysis

The backend provides a well-structured API with:
- POST `/ask` endpoint accepting QueryRequest with query string
- Response with QueryResponse containing answer, sources, matched_chunks, error, status, and query_time_ms
- Proper error handling and validation

### Frontend Integration Approach

The Docusaurus frontend will be extended with:
- A chat UI component positioned in the bottom right of the page
- React state management for query input, responses, loading states, and errors
- API communication layer to interact with the backend

### Technology Stack

- **Frontend**: React/TypeScript with Docusaurus
- **API Communication**: fetch API or axios for HTTP requests
- **UI Styling**: CSS modules or Tailwind CSS for component styling
- **State Management**: React hooks (useState, useEffect)

## Phase 1: Data Model & Contracts

### Data Model: data-model.md

The frontend will work with the following data structures that mirror the backend API:

**QueryRequest Interface:**
```typescript
interface QueryRequest {
  query: string;
}
```

**MatchedChunk Interface:**
```typescript
interface MatchedChunk {
  content: string;
  url: string;
  position: number;
  similarity_score: number;
}
```

**QueryResponse Interface:**
```typescript
interface QueryResponse {
  answer: string;
  sources: string[];
  matched_chunks: MatchedChunk[];
  error?: string;
  status: 'success' | 'error' | 'empty';
  query_time_ms?: number;
  confidence?: string;
}
```

**UI State Interface:**
```typescript
interface ChatUIState {
  query: string;
  response: QueryResponse | null;
  isLoading: boolean;
  error: string | null;
  history: Array<{query: string, response: QueryResponse}>;
}
```

### API Contract: contracts/rag-agent-api.json

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "RAG Agent API",
    "version": "1.0.0",
    "description": "API for RAG Agent with document retrieval and question answering"
  },
  "paths": {
    "/ask": {
      "post": {
        "summary": "Process a user query through the RAG agent",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/QueryRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Query processed successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/QueryResponse"
                }
              }
            }
          },
          "400": {
            "description": "Bad request - invalid query"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "QueryRequest": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "The user's question to be processed by the RAG agent"
          }
        },
        "required": ["query"]
      },
      "QueryResponse": {
        "type": "object",
        "properties": {
          "answer": {
            "type": "string",
            "description": "The answer generated by the RAG agent"
          },
          "sources": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "List of source documents referenced in the response"
          },
          "matched_chunks": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/MatchedChunk"
            },
            "description": "Text chunks that contributed to the answer"
          },
          "error": {
            "type": "string",
            "description": "Error message if the query failed"
          },
          "status": {
            "type": "string",
            "enum": ["success", "error", "empty"],
            "description": "Status of the query processing"
          },
          "query_time_ms": {
            "type": "number",
            "description": "Time taken to process the query in milliseconds"
          },
          "confidence": {
            "type": "string",
            "description": "Confidence level of the response"
          }
        }
      },
      "MatchedChunk": {
        "type": "object",
        "properties": {
          "content": {
            "type": "string",
            "description": "The content of the matched text chunk"
          },
          "url": {
            "type": "string",
            "description": "URL of the source document"
          },
          "position": {
            "type": "number",
            "description": "Position of the chunk in the source"
          },
          "similarity_score": {
            "type": "number",
            "description": "Similarity score of the chunk to the query"
          }
        }
      }
    }
  }
}
```

## Phase 2: Implementation Tasks

### Task 1: Create Chat UI Component
- **Location**: `book/src/components/RAGChat`
- **File**: `RAGChat.tsx`
- **Purpose**: Create the main chat interface component
- **Features**: Query input, response display, loading states, error handling

### Task 2: Add Chat Component to Layout
- **Location**: Add to bottom-right of Docusaurus pages
- **Method**: Add as floating component to main layout or specific pages
- **Styling**: Ensure it doesn't interfere with existing UI

### Task 3: Implement API Communication Layer
- **Location**: Create API service in `book/src/utils/rag-api.ts`
- **Purpose**: Handle communication with backend `/ask` endpoint
- **Features**: Error handling, request/response validation

### Task 4: Add State Management
- **Implementation**: Use React hooks for state management
- **State**: Query input, response data, loading status, error states
- **Persistence**: Consider local storage for query history

### Task 5: Implement Response Display
- **Answer**: Display the main answer from RAG agent
- **Sources**: Show source documents with links
- **Chunks**: Display matched text chunks with context

### Task 6: Add Loading and Error States
- **Loading**: Show spinner/indicator during query processing
- **Errors**: Display error messages when API calls fail
- **Empty**: Handle responses with no results

## Quickstart Guide: quickstart.md

### Running the Integrated System

1. **Start the Backend API**:
   ```bash
   cd backend
   uvicorn api:app --reload --port 8000
   ```

2. **Start the Frontend**:
   ```bash
   cd book
   npm run start
   ```

3. **Access the Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/docs (for API documentation)
   - The chat interface will be available on all pages in the bottom-right corner

### Development Notes

- The backend runs on port 8000 with CORS enabled for local development
- The frontend runs on port 3000 and will make requests to localhost:8000
- API responses include answer, sources, and matched text chunks as specified
- The chat UI is designed to be non-intrusive while providing access to RAG capabilities

## Post-Design Constitution Check

### Verification of Requirements

✅ **No redesign of entire UI**: Implementation adds only a small chat component to existing UI
✅ **Clean API requests**: Uses minimal, structured API calls to backend
✅ **Connection focus**: Implementation connects existing backend to frontend without modifying backend logic
✅ **Loading states**: Proper loading indicators implemented
✅ **Error handling**: Comprehensive error handling for various scenarios
✅ **Response display**: Shows answers, sources, and matched chunks as required

### Quality Assurance

- All functional requirements from the specification are addressed
- Success criteria can be measured with the implemented solution
- Edge cases are handled appropriately
- The solution maintains the existing architecture while adding new functionality