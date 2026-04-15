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
        name="Document Assistant",
        system_prompt="You are a helpful assistant that answers based on uploaded documents."
    )
    print(f"Created assistant: {assistant.assistant_id}")

    print("\nStep 2: Uploading document to assistant...")
    document = await client.upload_document_to_assistant(
        assistant.assistant_id,
        "knowledge.txt"
    )
    print(f"Uploaded document: {document.document_id} | status: {document.status}")

    print("\nStep 3: Waiting for document to be indexed...")
    while True:
        status = await client.get_document_status(document.document_id)
        print(f"Document status: {status.status}")

        if status.status == "indexed":
            print("Document is ready for RAG.")
            break
        elif status.status == "error":
            raise RuntimeError(f"Document indexing failed: {status.status_message}")

        await asyncio.sleep(2)

    print("\nStep 4: Creating thread...")
    thread = await client.create_thread(assistant.assistant_id)
    print(f"Created thread: {thread.thread_id}")

    print("\nStep 5: Asking a question about the uploaded document...")
    response = await client.add_message(
        thread_id=thread.thread_id,
        content="What is my target role and which technologies do I prefer?",
        stream=False
    )

    print("\nAssistant response:")
    print(response.content)


if __name__ == "__main__":
    asyncio.run(main())