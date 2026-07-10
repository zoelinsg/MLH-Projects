# Travel Context Assistant

A full-stack travel assistant that uses Auth0 authentication, a first-party API, and a public weather API to generate personalized travel suggestions.

## Features

- Log in with Auth0 Universal Login
- Load user travel preferences from a first-party API
- Fetch real-time weather data from a public third-party API
- Generate travel suggestions based on authenticated user context

## Tech Stack
- React
- Vite
- Auth0 React SDK
- Java
- Spring Boot
- Spring Security
- Open-Meteo API
- CSS

## Project Structure
```bash
travel-context-assistant/
├── README.md
├── screenshots/
├── frontend/
└── backend/
```

## How to Run
### Frontend
1. Go to the frontend folder
2. Install dependencies:
```bash
npm install
```

3. Add a .env file:
```bash
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
```

4. Start the app:
```bash
npm run dev
```

### Backend
1. Go to the backend/travelcontextassistantapi folder
2. Start the Spring Boot app:
```bash
./mvnw spring-boot:run
```
## Purpose
This project was built to demonstrate how authenticated user context can be preserved across a React frontend, a first-party backend API, and a public third-party API.