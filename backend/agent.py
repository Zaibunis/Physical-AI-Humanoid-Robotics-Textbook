import os
import json
import logging
import time
import asyncio
from typing import Dict, List
from dotenv import load_dotenv

from agents import Agent
from agents import function_tool

import google.generativeai as genai

# ==============================
# ENV + LOGGING
# ==============================

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not set")

genai.configure(api_key=GEMINI_API_KEY)

# ==============================
# RETRIEVAL (QDRANT)
# ==============================

def retrieve_information_helper(query: str) -> Dict:
    from retrieve import RAGRetriever
    retriever = RAGRetriever()

    try:
        json_response = retriever.retrieve(
            query_text=query,
            top_k=5,
            threshold=0.0
        )
        results = json.loads(json_response)

        chunks = []
        for r in results.get("results", []):
            chunks.append({
                "content": r["content"],
                "url": r["url"],
                "position": r["position"],
                "similarity_score": r["similarity_score"],
            })

        return {
            "query": query,
            "retrieved_chunks": chunks,
            "total_results": len(chunks),
        }

    except Exception as e:
        logger.error(f"Retrieval error: {e}")
        return {
            "query": query,
            "retrieved_chunks": [],
            "total_results": 0,
            "error": str(e),
        }


@function_tool
def retrieve_information(query: str) -> Dict:
    return retrieve_information_helper(query)

# ==============================
# RAG AGENT
# ==============================

class RAGAgent:
    def __init__(self):
        self.agent = Agent(
            name="RAG Assistant",
            instructions=(
                "Answer strictly using retrieved documents. "
                "If no documents are available, say you don't know."
            ),
            tools=[retrieve_information],
        )

        self.model = genai.GenerativeModel("gemini-2.5-flash")

        logger.info("RAG Agent initialized with Gemini")

    async def _async_query_agent(self, query_text: str) -> Dict:
        start = time.time()

        try:
            retrieval = retrieve_information_helper(query_text)
            chunks = retrieval.get("retrieved_chunks", [])

            if not chunks:
                return {
                    "answer": "No relevant information found in the knowledge base.",
                    "sources": [],
                    "matched_chunks": [],
                    "confidence": "low",
                    "query_time_ms": (time.time() - start) * 1000,
                }

            context = json.dumps(chunks, indent=2)

            prompt = f"""
You are a retrieval-based assistant.
Answer ONLY using the documents below.
If the answer is not present, say you don't know.

DOCUMENTS:
{context}

QUESTION:
{query_text}
"""

            response = self.model.generate_content(
                prompt,
                generation_config={
                    "temperature": 0.2,
                    "max_output_tokens": 1024,
                },
            )

            answer = response.text.strip()

            return {
                "answer": answer,
                "sources": list({c["url"] for c in chunks}),
                "matched_chunks": chunks,
                "confidence": self._calculate_confidence(chunks),
                "query_time_ms": (time.time() - start) * 1000,
            }

        except Exception as e:
            logger.error(f"Gemini error: {e}")
            return {
                "answer": "An error occurred while processing your request.",
                "sources": [],
                "matched_chunks": [],
                "confidence": "low",
                "query_time_ms": (time.time() - start) * 1000,
            }

    def query_agent(self, query_text: str) -> Dict:
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as ex:
                return ex.submit(asyncio.run, self._async_query_agent(query_text)).result()
        except RuntimeError:
            return asyncio.run(self._async_query_agent(query_text))

    def _calculate_confidence(self, chunks: List[Dict]) -> str:
        if not chunks:
            return "low"
        avg = sum(c["similarity_score"] for c in chunks) / len(chunks)
        if avg >= 0.7:
            return "high"
        if avg >= 0.4:
            return "medium"
        return "low"


# ==============================
# MAIN
# ==============================

def main():
    logger.info("Initializing RAG Agent...")
    agent = RAGAgent()

    queries = ["What is ROS2?"]

    print("RAG Agent - Testing")
    print("=" * 50)

    for q in queries:
        print(f"\nQ: {q}")
        print("-" * 30)
        res = agent.query_agent(q)
        print("Answer:", res["answer"])
        print("Confidence:", res["confidence"])
        print("Time:", f"{res['query_time_ms']:.2f}ms")


if __name__ == "__main__":
    main()
