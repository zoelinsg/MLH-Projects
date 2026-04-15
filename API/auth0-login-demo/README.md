# Auth0 Login Demo

This project is a simple React app that demonstrates a basic Auth0 login flow for the MLH challenge.

## Features

- Sign up with Auth0
- Log in with Auth0
- Log out with Auth0
- Display authenticated user profile information

## Tech Stack

- React
- Vite
- Auth0 React SDK

## Auth0 Setup

Create an Auth0 Single Page Application and configure:

- Allowed Callback URLs: `http://localhost:5173`
- Allowed Logout URLs: `http://localhost:5173`
- Allowed Web Origins: `http://localhost:5173`

Add the following values to a `.env` file:

```env
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
```
Run locally
```bash
npm install
npm run dev
```

## What this demo shows

This app uses Auth0 to handle authentication in a React single-page application. Users can sign up, log in, log out, and view their profile information after authentication.