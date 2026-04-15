# Simple REST API (FastAPI) — GHW Cloud Challenge

A minimal RESTful API built with **FastAPI** and managed with **Poetry**, deployed to **Render**.

## Live Demo
- Base URL: https://mlh-projects.onrender.com
- Swagger UI: https://mlh-projects.onrender.com/docs

## Endpoints
### `GET /`
Returns a welcome message.
- Example: `GET https://mlh-projects.onrender.com/`

### `GET /health`
Returns API health status + timestamp.
- Example: `GET https://mlh-projects.onrender.com/health`

### `GET /hello?name=Zoe`
Returns greeting message.
- Example: `GET https://mlh-projects.onrender.com/hello?name=Zoe`

### `POST /echo`
Echo back the message you send.
- URL: `POST https://mlh-projects.onrender.com/echo`
- Body:
```json
{
  "message": "Hello from GHW!"
}
```
## Tech Stack
- Python
- FastAPI
- Uvicorn
- Poetry
- Render (deployment)


## Run Locally (Poetry)
### Install dependencies
```bash
poetry install
```

### Start server
```bash
poetry run uvicorn main:app --reload --port 8000
```

## Deployment Notes (Render)
### This service is deployed on Render as a Web Service.
