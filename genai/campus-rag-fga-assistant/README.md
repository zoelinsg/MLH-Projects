# Campus RAG FGA Assistant
A role-aware document search demo that filters results before retrieval.

## Features
- Search campus documents by keyword
- Filter results based on user role
- Demonstrate access control before retrieval
- Show different search results for student, professor, and admin roles

## Tech Stack
- React
- Vite
- Python
- FastAPI
- Poetry
- CSS

## Project Structure

```bash
campus-rag-fga-assistant/
├── README.md
├── screenshots/
├── frontend/
└── backend/
```
## How to Run
### Backend
Go to the backend folder
Install dependencies with Poetry:
```bash
poetry install
```
Start the API:
```bash
poetry run uvicorn app.main:app --reload
```
### Frontend
Go to the frontend folder
Install dependencies:
```bash
npm install
```
Start the app:
```bash
npm run dev
```

## Demo Scenarios
- A student searching for budget gets no accessible results
- A professor searching for budget can access the research budget guide
- An admin searching for payroll can access the staff payroll 

## Purpose
This project was built to demonstrate a privacy-aware retrieval workflow where access rules are enforced before documents are returned to the user.