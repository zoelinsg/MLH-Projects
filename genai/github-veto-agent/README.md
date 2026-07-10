# GitHub Veto Agent

A demo agent that requires approval before executing sensitive GitHub actions.

## Features
- Show a list of GitHub-style issues
- Request approval before a sensitive action
- Approve or reject the action
- Display the final result

## Tech Stack
- React
- Vite
- Python
- FastAPI
- Poetry
- CSS

## How to Run
### Backend
```bash
poetry install
poetry run uvicorn app.main:app --reload
```

### Frontend
```bash
npm install
npm run dev
```
## Purpose
This project was built to demonstrate a veto-style approval workflow for high-impact GitHub actions.