import os
import json
from typing import List, Dict
import cohere
from qdrant_client import QdrantClient
import logging
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class RAGRetriever:
    def __init__(self):
        # Initialize Cohere client
        self.cohere_client = cohere.Client(
            api_key=os.getenv("COHERE_API_KEY")
        )

        # Initialize Qdrant client
        qdrant_url = os.getenv("QDRANT_URL", "http://localhost:6333")
        qdrant_api_key = os.getenv("QDRANT_API_KEY")

        if qdrant_api_key:
            self.qdrant_client = QdrantClient(
                url=qdrant_url,
                api_key=qdrant_api_key
            )
        else:
            self.qdrant_client = QdrantClient(url=qdrant_url)

        self.collection_name = "embeddings"

    # ---------------- EMBEDDING ----------------
    def get_embedding(self, text: str) -> List[float]:
        try:
            response = self.cohere_client.embed(
                texts=[text],
                model="embed-multilingual-v3.0",
                input_type="search_query"
            )
            return response.embeddings[0]
        except Exception as e:
            logger.error(f"Embedding error: {e}")
            return []

    # ---------------- QDRANT QUERY (FIXED) ----------------
    def query_qdrant(
        self,
        query_embedding: List[float],
        top_k: int = 5,
        threshold: float = 0.0
    ) -> List[Dict]:

        try:
            search_results = self.qdrant_client.search(
                collection_name=self.collection_name,
                query_vector=query_embedding,
                limit=top_k,
                score_threshold=threshold,
                with_payload=True
            )

            formatted_results = []

            for point in search_results:
                payload = point.payload or {}

                # ✅ FIX: READ FROM "text"
                content = payload.get("text", "").strip()
                url = payload.get("url", "")
                position = payload.get("position", 0)

                if not content:
                    logger.warning(
                        f"Missing content in chunk: {point.id}"
                    )
                    continue

                formatted_results.append({
                    "content": content,
                    "url": url,
                    "position": position,
                    "similarity_score": point.score,
                    "chunk_id": point.id,
                    "created_at": payload.get("created_at", "")
                })

            return formatted_results

        except Exception as e:
            logger.error(f"Qdrant query error: {e}")
            return []

    # ---------------- VERIFY ----------------
    def verify_content_accuracy(self, chunks: List[Dict]) -> bool:
        for chunk in chunks:
            if not chunk.get("content") or not chunk.get("url"):
                logger.warning(
                    f"Invalid chunk: {chunk.get('chunk_id')}"
                )
                return False
        return True

    # ---------------- FORMAT RESPONSE ----------------
    def format_json_response(
        self,
        results: List[Dict],
        query: str,
        query_time_ms: float
    ) -> str:

        response = {
            "query": query,
            "results": results,
            "metadata": {
                "query_time_ms": query_time_ms,
                "total_results": len(results),
                "timestamp": time.time(),
                "collection_name": self.collection_name
            }
        }
        return json.dumps(response, indent=2)

    # ---------------- MAIN RETRIEVE ----------------
    def retrieve(
        self,
        query_text: str,
        top_k: int = 5,
        threshold: float = 0.0
    ) -> str:

        start_time = time.time()
        logger.info(f"Processing query: {query_text}")

        query_embedding = self.get_embedding(query_text)
        if not query_embedding:
            return json.dumps({
                "query": query_text,
                "results": [],
                "error": "Embedding failed"
            })

        results = self.query_qdrant(
            query_embedding,
            top_k,
            threshold
        )

        query_time_ms = (time.time() - start_time) * 1000

        logger.info(
            f"Retrieval done in {query_time_ms:.2f}ms "
            f"({len(results)} results)"
        )

        return self.format_json_response(
            results,
            query_text,
            query_time_ms
        )


# ---------------- RETRIEVE ALL DATA (FIXED) ----------------
def retrieve_all_data():
    retriever = RAGRetriever()

    points = []
    offset = None

    while True:
        batch, next_offset = retriever.qdrant_client.scroll(
            collection_name=retriever.collection_name,
            limit=1000,
            offset=offset,
            with_payload=True,
            with_vectors=False
        )
        points.extend(batch)
        if next_offset is None:
            break
        offset = next_offset

    print(f"\nTotal chunks: {len(points)}\n")

    for i, point in enumerate(points, 1):
        payload = point.payload or {}
        content = payload.get("text", "")[:200]

        print(f"Chunk {i}")
        print(f"ID: {point.id}")
        print(f"URL: {payload.get('url')}")
        print(f"Content: {content}...")
        print("-" * 40)


# ---------------- MAIN ----------------
def main():
    retriever = RAGRetriever()

    query = "What is Physical AI?"
    response = retriever.retrieve(query, top_k=3)
    data = json.loads(response)

    print("\nQ:", query)
    print("-" * 40)

    for i, r in enumerate(data["results"], 1):
        print(f"Result {i} (Score: {r['similarity_score']:.3f})")
        print(f"URL: {r['url']}")
        print(f"Content: {r['content'][:200]}...")
        print()


if __name__ == "__main__":
    main()
