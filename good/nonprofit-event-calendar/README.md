# Community Event Calendar for Nonprofits

A simple, beginner-friendly single-page web app that helps nonprofits share upcoming community events, workshops, fundraisers, and volunteer activities.

## Why this project is useful

Nonprofit teams and community volunteers often need a lightweight, easy-to-use way to publish and browse upcoming events. This project provides a small, accessible tool to:

- Quickly view community events
- Filter and search events by keyword or category
- Add new events without any backend or account setup

It is intentionally simple so organizations can host the static files on an existing website or share the HTML file directly.

## Features

- Event cards with date, location, category, and short description
- Keyword search to filter events in real time
- Category filter buttons (Volunteer, Fundraiser, Workshop, Community, Education)
- Event details modal for full event information
- Add Event modal to submit new events (stored in a JavaScript array in memory)

## Technologies used

- HTML
- CSS
- JavaScript
- GitHub Copilot (assistive development)

No frameworks, backend, database, or user accounts are used — the app runs entirely in the browser.

## How to run locally

1. Clone or download this folder to your computer.
2. Open `index.html` in your browser. The easiest options:

   - Double-click `index.html` to open in your default browser.
   - Or serve files from a local HTTP server (recommended for consistent behavior):

     ```bash
     # Python 3
     python -m http.server 8000

     # Then open http://localhost:8000 in your browser and navigate to the folder
     ```

3. Use the search bar and category filters to explore events. Click **Add Event** to open the form and submit a new event (it will be visible immediately but stored only in memory).

## How this helps nonprofits and communities

- Low friction: no accounts or backend setup required — great for grassroots groups.
- Shareable: the static files can be hosted on GitHub Pages, a nonprofit website, or shared directly.
- Inclusive: designed with readable typography, clear controls, and keyboard accessibility improvements to help more users engage.

## Future improvements (non-required, optional ideas)

- Add local persistence (optional) using `localStorage` so events survive page reloads.
- Export/import events as JSON to share event lists between organizations.
- Add calendar export (iCal) links for individual events.
- Improve accessibility further (focus trapping inside modals, ARIA roles refinements).
- Add a lightweight RSS feed or public JSON endpoint (would require a backend or hosting service).

## Notes & constraints

- This project intentionally does not include volunteer scheduling, signup flows, login, or any backend services. It is a simple client-side event discovery and submission tool.

---

If you'd like, I can add a small demo GIF, or create a GitHub Pages deployment guide next.
