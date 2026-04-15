# Hello, Backboard

This project demonstrates the Backboard Python SDK quickstart flow.

## What it does

- Loads the Backboard API key from `.env`
- Creates a new assistant
- Creates a conversation thread
- Sends the first user message
- Prints the assistant response

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

## Example output
* Created assistant ID
* Created thread ID
* Assistant response