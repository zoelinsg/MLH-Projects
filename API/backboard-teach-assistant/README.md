# Teach Your Assistant

This project demonstrates how to teach a Backboard assistant with uploaded documents.

## What it does

- Creates a Backboard assistant
- Uploads a document to the assistant
- Polls until the document is indexed
- Creates a thread
- Asks a question based on the uploaded document
- Prints the assistant response

## Tech Stack

- Python
- Poetry
- backboard-sdk
- python-dotenv

## File Used

- knowledge.txt

## How to run

```bash
poetry install
poetry run python agent.py
```

## Example question

What is my target role and which technologies do I prefer?