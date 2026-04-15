import asyncio
import os
import requests
from backboard import BackboardClient
import dotenv

dotenv.load_dotenv()

BASE_URL = "https://app.backboard.io/api"


def api_headers(api_key: str):
    return {
        "X-API-Key": api_key,
        "Content-Type": "application/json",
    }


def list_memories(api_key: str, assistant_id: str):
    response = requests.get(
        f"{BASE_URL}/assistants/{assistant_id}/memories",
        headers=api_headers(api_key),
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


def search_memories(api_key: str, assistant_id: str, query: str, limit: int = 5):
    response = requests.post(
        f"{BASE_URL}/assistants/{assistant_id}/memories/search",
        headers=api_headers(api_key),
        json={
            "query": query,
            "limit": limit,
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


async def main():
    api_key = os.getenv("BACKBOARD_API_KEY")
    if not api_key:
        raise ValueError("Missing BACKBOARD_API_KEY in .env")

    client = BackboardClient(api_key=api_key)

    print("Step 1: Creating assistant...")
    assistant = await client.create_assistant(
        name="Brain Assistant",
        system_prompt="You are a helpful assistant. Keep answers concise, direct, and under 60 words unless asked otherwise."
    )
    print(f"Created assistant: {assistant.assistant_id}")

    print("\nStep 2: Creating first thread for memory...")
    thread1 = await client.create_thread(assistant.assistant_id)
    print(f"Created thread 1: {thread1.thread_id}")

    print("\nStep 3: Storing a memory...")
    memory_response = await client.add_message(
        thread_id=thread1.thread_id,
        content="My favorite programming language is Java and I want to become a full-stack engineer.",
        memory="Auto",
        stream=False
    )
    print("Assistant response after memory message:")
    print(memory_response.content)

    print("\nStep 4: Creating second thread to test memory recall...")
    thread2 = await client.create_thread(assistant.assistant_id)
    print(f"Created thread 2: {thread2.thread_id}")

    recall_response = await client.add_message(
        thread_id=thread2.thread_id,
        content="What is my favorite programming language and target role? Answer in one sentence.",
        memory="Auto",
        stream=False
    )
    print("\nMemory recall response:")
    print(recall_response.content)

    print("\nStep 5: Testing web search...")
    web_response = await client.add_message(
        thread_id=thread2.thread_id,
        content="What are 2 current AI developer trends in 2026? Keep the answer under 60 words and use web search.",
        web_search="Auto",
        stream=False
    )
    print("\nWeb search response:")
    print(web_response.content)

    print("\nStep 6: Listing all memories...")
    memories_data = list_memories(api_key, assistant.assistant_id)
    memories = memories_data.get("memories", [])

    if not memories:
        print("No memories found.")
    else:
        for memory in memories:
            print(f"- {memory.get('content', '(no content)')}")

    print("\nStep 7: Searching memories...")
    search_data = search_memories(
        api_key,
        assistant.assistant_id,
        query="programming language preferences",
        limit=5,
    )
    print(f"Found {search_data.get('total_count', 0)} matching memories")

    for memory in search_data.get("memories", []):
        score = memory.get("score", 0)
        content = memory.get("content", "(no content)")
        print(f"[{score:.2f}] {content}")


if __name__ == "__main__":
    asyncio.run(main())