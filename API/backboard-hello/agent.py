import asyncio
import os
from backboard import BackboardClient
import dotenv

dotenv.load_dotenv()

async def main():
    client = BackboardClient(api_key=os.getenv("BACKBOARD_API_KEY"))
    assistant = await client.create_assistant(
        name="My First Assistant",
        system_prompt="You are a helpful assistant that responds concisely."
    )

    print(f"Created assistant: {assistant.assistant_id}")

asyncio.run(main())