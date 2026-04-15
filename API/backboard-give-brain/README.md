# Give Your Assistant a Brain

This project demonstrates how to add memory and web search capabilities to a Backboard assistant.

## What it does

- Creates a Backboard assistant
- Stores user information with memory enabled
- Creates a new thread and tests memory recall
- Sends a message with web search enabled
- Prints the assistant responses

## Tech Stack

- Python
- Poetry
- backboard-sdk
- python-dotenv

## How to run

```bash
poetry install
poetry run python agent.py
```

## Features Used

- Memory (`memory="Auto"`)
- Web Search (`web_search="Auto"`)
- List memories
- Search memories