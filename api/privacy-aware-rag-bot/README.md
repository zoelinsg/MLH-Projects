# Privacy-Aware RAG Bot

A React + FastAPI demo that shows how to enforce document-level access control in a Retrieval-Augmented Generation (RAG) workflow.

This project demonstrates a privacy-aware internal knowledge assistant where sensitive documents are filtered by authorization rules before they are used to generate an answer.

## Challenge Goal

Build an internal-facing knowledge assistant that uses RAG while enforcing document-level access control.

In this demo:

- A **manager** can access sensitive documents such as:
  - Salary Policy
  - Q4 Budget
- A **general employee** cannot access those sensitive documents, even if they appear in the retrieval results
- Public HR documents remain accessible to both users

## Tech Stack

- **Frontend:** React
- **Backend:** FastAPI
- **Package Manager (Backend):** Poetry
- **Authorization Model:** document-level access control (designed to be replaced by Auth0 FGA integration)
- **Documents:** local Markdown files in the `docs/` folder

## Project Structure

- `frontend/`: React client
- `backend/`: FastAPI API with Poetry
- `docs/`: sample internal documents

## Sample Documents

The demo includes the following internal documents:

- `employee_handbook.md`
- `holiday_policy.md`
- `salary_policy.md`
- `budget_q4.md`

## Demo Users

Two example users are used to demonstrate authorization behavior:

- **Alice** — Manager, HR
- **Bob** — Employee, Engineering

## How It Works

1. The user submits a question
2. The backend retrieves candidate documents relevant to the question
3. Each retrieved document is checked against access rules
4. Only authorized documents are used to generate the final answer
5. Restricted documents are denied before they reach the answer generation step

This is the core privacy-aware RAG behavior demonstrated by the app.

## Authorization Demo

### Manager access
A manager can retrieve and use:

- Salary Policy
- Q4 Budget
- Employee Handbook

### Employee access
A general employee may retrieve candidate documents, but only authorized documents are used in the final answer.

Restricted documents such as:

- Salary Policy
- Q4 Budget

are denied before they are passed to the answer generation step.

## Example Questions

Recommended demo questions:

- `What is the salary policy?`
- `What does the Q4 budget say about compensation planning?`
- `What are the standard working hours?`
- `How many annual leave days do employees receive?`

## Run Locally

### Backend

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload
```
Backend runs at:
```bash
http://127.0.0.1:8000
```
Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at:
```bash
http://localhost:5173
```

## Expected Demo Result

When Alice (Manager) asks about salary policy:

* Salary Policy is retrieved
* Salary Policy is authorized
* The answer can include salary-related information

When Bob (Employee) asks the same question:

* Salary Policy may still appear in retrieved results
* Salary Policy is denied
* The final answer only uses documents Bob is allowed to access

This demonstrates that sensitive documents are protected even when they are part of the retrieval set.

## Future Improvement

The current demo uses a simplified authorization layer to simulate document-level access control.

The next step is to replace the local authorization logic with Auth0 FGA checks so the app can enforce fine-grained authorization policies in a production-style workflow.