import asyncio
import os
from backboard import BackboardClient
import dotenv

dotenv.load_dotenv()


async def main():
    api_key = os.getenv("BACKBOARD_API_KEY")
    if not api_key:
        raise ValueError("Missing BACKBOARD_API_KEY in .env")

    client = BackboardClient(api_key=api_key)

    print("Step 1: Creating assistant...")
    assistant = await client.create_assistant(
        name="My First Assistant",
        system_prompt="You are a helpful assistant that responds concisely."
    )
    print(f"Created assistant: {assistant.assistant_id}")

    print("\nStep 2: Creating thread...")
    thread = await client.create_thread(assistant.assistant_id)
    print(f"Created thread: {thread.thread_id}")

    print("\nStep 3: Sending first message...")
    response = await client.add_message(
        thread_id=thread.thread_id,
        content="Hello! Please introduce yourself in one short paragraph.",
        stream=False
    )

    print("\nAssistant response:")
    print(response.content)


if __name__ == "__main__":
    asyncio.run(main())