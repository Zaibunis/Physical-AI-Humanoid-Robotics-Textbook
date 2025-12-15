# Research: OpenAI Agent with Qdrant Retrieval

**Decision**: Implement a Python-based agent using the OpenAI Agent SDK. A custom tool will be created to perform similarity searches against a Qdrant vector database.

**Rationale**: This approach directly follows the user's request and leverages standard, well-documented libraries for building RAG (Retrieval-Augmented Generation) systems. Using a custom tool within the agent framework is the idiomatic way to extend agent capabilities with external data sources.

**Alternatives Considered**:
*   **LangChain/LlamaIndex**: These are higher-level frameworks that could also accomplish the goal. However, the user specifically requested the `OpenAI Agent SDK`, implying a desire to work with the foundational library directly. Sticking to the OpenAI SDK reduces dependencies and complexity.
*   **Direct OpenAI API calls without Agent SDK**: This would involve manually managing the conversation loop, tool definitions, and tool calls. The Agent SDK abstracts away this boilerplate, making the implementation cleaner and more robust.

## Technical Implementation Details

### 1. Environment Setup
-   **Dependencies**: `openai`, `qdrant-client`.
-   **Configuration**: The agent will need access to:
    -   `OPENAI_API_KEY`
    -   `QDRANT_URL`
    -   `QDRANT_API_KEY`
    -   `QDRANT_COLLECTION_NAME`
-   These will be loaded from environment variables for security and flexibility.

### 2. Qdrant Retrieval Tool
A Python function, let's call it `retrieve_context`, will be defined.
-   **Input**: `query: str` (the user's question).
-   **Logic**:
    1.  Initialize the `QdrantClient` using the environment variables.
    2.  Use the client's `search` method on the specified collection.
    3.  The search will use a pre-existing embedding model (assumed to be compatible with the one used for ingestion) to convert the user's query into a vector.
    4.  Retrieve the `top_k` (e.g., k=3) most similar document chunks.
    5.  Format the results into a single string or a structured list of strings.
-   **Output**: `str` (the concatenated context to be injected into the agent's prompt).

### 3. Agent and Tool Integration
1.  The `retrieve_context` function will be decorated or formatted to match the OpenAI SDK's tool specification (e.g., a JSON schema describing its name, purpose, and parameters).
2.  An `Agent` will be initialized from the `openai` library.
3.  The `retrieve_context` tool will be passed to the agent during its initialization.
4.  A `Thread` will be created to manage the conversation.

### 4. Execution Flow
1.  The main script (`agent.py`) will accept a user's question.
2.  The question will be added as a `Message` to the agent's `Thread`.
3.  A `Run` will be created for the `Thread`, passing the `Agent` details.
4.  The agent will process the message. It will recognize that the user's question requires information it doesn't have, and it will see that the `retrieve_context` tool is available and relevant.
5.  The agent will generate a `tool_calls` request, asking to execute `retrieve_context` with the user's query as the argument.
6.  The application code will execute the `retrieve_context` function with the provided arguments.
7.  The output (the retrieved context from Qdrant) will be submitted back to the `Run`.
8.  The agent will now have the user's question and the relevant context. It will synthesize a final answer based *only* on this context and present it to the user.
