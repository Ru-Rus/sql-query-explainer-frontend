# AI SQL Query Explainer — Frontend

A React + TypeScript single-page app powered by Google Gemini for SQL analysis.

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** — build tool and dev server
- **Tailwind CSS v4** — styling with dark/light mode support
- **CodeMirror** — SQL syntax highlighting editor
- **lz-string** — query compression for shareable URLs

## Features

- SQL syntax highlighting via CodeMirror
- Plain-English explanation, performance issues, ERD description, optimizations
- Copy to clipboard on each result section
- Export results as a markdown file
- Share a query via a compressed URL (`?q=...`)
- Dark/light mode toggle
- Query history (last 10, localStorage)
- History cache — same query loads instantly without an API call
- Daily usage counter (10 queries/day, localStorage)
- Loading skeleton while waiting for Gemini

## Project Structure

## Setup

```bash
npm install
cp .env.example .env
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | No | Backend URL. Defaults to `http://localhost:8000` |

## Running

```bash
npm run dev
```

Requires the backend running at `VITE_API_URL`. See backend README.

## Running Tests

```bash
npm run test
