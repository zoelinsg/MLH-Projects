# Context-Preserving Assistant

A React + FastAPI demo that shows how authenticated user identity can be preserved across first-party and third-party API calls.

## Overview

This project demonstrates a simple full-stack assistant workflow:

1. The user signs in with Auth0 Universal Login
2. The frontend obtains an access token
3. The token is used to call a protected first-party API
4. The first-party API returns user-specific preferences
5. The assistant uses those preferences to call a public third-party weather API
6. The final response preserves user context throughout the session

## Features

- Auth0 Universal Login
- Protected first-party API with access token validation
- User-specific preferences retrieved from backend
- Public third-party weather API integration
- Assistant response grounded in authenticated user context

## Tech Stack

- React
- FastAPI
- Poetry
- Auth0
- Axios

## Project Structure

- `frontend/`: React frontend
- `backend/`: FastAPI backend
- `README.md`: project documentation

## Demo Flow

### 1. User Authentication
The user signs in through Auth0 Universal Login.

### 2. First-Party API Access
The frontend sends the access token to the protected backend endpoint:

- `GET /api/preferences/me`

The backend validates the token and returns user-specific preferences such as:

- preferred city
- temperature unit

### 3. Third-Party API Access
The assistant then calls a public weather API based on the user’s saved preferences.

### 4. Context-Preserved Response
The final assistant response references both:

- the authenticated user's saved preferences
- live weather data from the external API

## Example Response

```text
I found your saved preference: Taipei, celsius. The current weather in Taipei is 23.8°C.
```

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
### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at:
```bash
http://localhost:5173
```
## Environment Variables
### Frontend .env
```bash
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_AUDIENCE=http://localhost:8000/api
```
### Backend .env
```bash
AUTH0_DOMAIN=your_auth0_domain
AUTH0_AUDIENCE=http://localhost:8000/api
```
## Protected API Endpoints
* GET /api/preferences/me
* POST /api/assistant/chat

## Submission Summary

This project demonstrates that authenticated user identity is preserved across the assistant session. The frontend authenticates the user with Auth0, uses the authenticated token to access a protected first-party API for user-specific preferences, and then uses those preferences to complete a third-party API task with a context-aware assistant response.