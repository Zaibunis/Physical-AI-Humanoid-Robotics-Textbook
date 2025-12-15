import os
from dotenv import load_dotenv
from agent import ask_question

# Load environment variables from .env file
load_dotenv()

def main():
    # Example question
    question = "What is the capital of France?" # Replace with a question relevant to your Qdrant content

    print(f"Asking question: {question}")

    # Get the answer from the agent
    answer = ask_question(question)

    print("\nReceived Answer:")
    print(answer)

if __name__ == "__main__":
    main()