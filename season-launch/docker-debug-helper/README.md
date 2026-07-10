# Docker Debug Helper

## Core Goal

Build a small project using a new tool for MLH Global Hack Week: Season Launch.

For this challenge, I used **Docker** to containerize a beginner-friendly debugging web app.

## Project Overview

**Docker Debug Helper** is a small web application that helps beginners learn common programming bugs and debugging actions.

The app shows:

- a bug title
- an error message
- a likely cause
- a suggested fix
- a button to view the next bug scenario

## Why I Chose Docker

I chose Docker because it is an important tool for modern software development and DevOps.

Docker allows developers to package an application with its runtime and dependencies so the project can run consistently across different environments.

This was a useful new tool to practice because it connects software development with deployment and environment management.

## Tech Stack

- Docker
- Node.js
- Express
- HTML
- CSS
- JavaScript

## How to Run Locally Without Docker

```bash
npm install
npm start
```

### Then open:
```bash
http://localhost:3000
```

### How to Run With Docker

Build the Docker image:
```bash
docker build -t docker-debug-helper .
```

Run the container:
```bash
docker run -p 3000:3000 docker-debug-helper
```
Then open:
```bash
http://localhost:3000
```

API Endpoints
```bash
GET /api/bugs
GET /api/health
```

## What I Learned

- how to create a Dockerfile
- how to build a Docker image
- how to run a container locally
- how to expose a port from a container
- how Docker can make project setup more consistent
- how to connect a simple frontend with an Express backend

## MLH Submission Summary

I built Docker Debug Helper for the "Build a project using a new tool" challenge.

The new tool I practiced was Docker. I used it to containerize a Node.js and Express web app that teaches beginner-friendly debugging concepts.