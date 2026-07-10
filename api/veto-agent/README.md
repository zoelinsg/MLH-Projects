# The Veto Agent

A React + FastAPI demo that shows how an AI-agent style workflow can gate sensitive third-party actions behind an approval step.

This project demonstrates a simple approval-based control flow inspired by **Token Vault** and **Asynchronous Authorization** patterns. Low-risk actions are executed immediately, while sensitive actions are paused until user approval is granted.

## Challenge Goal

Build an AI agent integrated with a third-party service that can perform automated tasks, but requires explicit approval for high-impact actions outside the normal execution flow.

In this demo:

- Safe actions such as listing repositories or listing issues are executed immediately
- Sensitive actions such as closing an issue are blocked and marked as `approval_required`
- The action is only executed after the user explicitly approves it

## Tech Stack

- **Frontend:** React
- **Backend:** FastAPI
- **Package Manager (Backend):** Poetry
- **HTTP Client:** Axios
- **Demo Service:** Mock GitHub-style service

## Project Structure

- `frontend/`: React client
- `backend/`: FastAPI API with Poetry
- `README.md`: project documentation

## Features

### Immediate actions
The agent can directly execute low-risk commands:

- List repositories
- List issues

### Sensitive action with veto / approval flow
The agent does **not** directly execute high-risk commands:

- Close issue

Instead, the system:

1. Receives the command
2. Detects that the action is sensitive
3. Returns `approval_required`
4. Waits for the user to click **Approve** or **Deny**
5. Executes only after approval

## Demo Commands

The frontend currently supports three commands:

- `List Repositories`
- `List Issues`
- `Close Issue (Sensitive)`

## Example Flow

### 1. Safe action
User selects:

- `List Repositories`

Expected result:

- Status = `completed`
- Repository data is returned immediately

### 2. Sensitive action
User selects:

- `Close Issue (Sensitive)`

Expected result:

- Status = `approval_required`
- Execution is paused
- Approve / Deny buttons are shown

### 3. Approved action
After clicking **Approve**:

- Status = `approved_and_executed`
- The issue is closed

### 4. Denied action
After clicking **Deny**:

- Status = `denied`
- The issue is not executed

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

## API Summary
Main demo endpoints:
* POST /command
* POST /approve
* POST /deny
* GET /pending/{action_id

## Notes

This project is a simplified MVP focused on demonstrating the approval-gated execution flow for sensitive actions.

The current version uses a mock GitHub-style service and a local pending-action store to simulate:

* third-party task execution
* approval-required state
* user confirmation before 

## Future Improvement

Future versions can replace the mock service and local approval logic with:

* real third-party API integration
* Auth0 Token Vault for secure token access
* Auth0 asynchronous authorization / out-of-band approval flow

## Submission Summary
This project demonstrates that:

* low-risk agent actions can run immediately
* sensitive actions are halted before execution
* approval is required before the action continues