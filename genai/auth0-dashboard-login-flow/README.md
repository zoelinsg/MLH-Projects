# Auth0 Dashboard Login Flow

A simple React application that demonstrates how to set up an authentication flow with Auth0 Universal Login.

## Features

- Log in with Auth0 Universal Login
- Log out securely
- Display authenticated user information
- Show a simple authenticated dashboard view after login

## Tech Stack

- React
- Vite
- Auth0 React SDK
- CSS

## Getting Started

1. Open the `frontend` directory.
2. Install dependencies:
```bash
npm install

```
3. Create a .env file in the frontend directory:
```bash
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
```

4. Start the development server:
```bash
npm run dev
```

## Auth0 Configuration
Set the following values in your Auth0 application settings:

- Allowed Callback URLs: http://localhost:5173
- Allowed Logout URLs: http://localhost:5173
- Allowed Web Origins: http://localhost:5173

## Project Structure
```bash
auth0-dashboard-login-flow/
├── README.md
├── screenshots/
└── frontend/
```

## Purpose

This project was built as part of an Auth0 challenge to practice setting up a first login flow in a React application.