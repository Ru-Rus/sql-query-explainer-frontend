# AI SQL Query Explainer — Frontend

A React + TypeScript single-page app that lets you paste a SQL query and get back a plain-English explanation, performance warnings, an ERD description, and optimization suggestions — powered by an AI backend.

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** as the build tool / dev server
- **Tailwind CSS v4** (via `@tailwindcss/vite`) for styling

## How It Works

1. User pastes a SQL query into the textarea in `QueryInput`
2. Clicking **"Explain This Query"** calls `explainQuery()` from `api.ts`
3. `api.ts` sends a `POST` to the backend at `VITE_API_URL/api/explain`
4. The backend validates the query, calls Gemini, and returns structured JSON
5. `App.tsx` stores the result in state and passes it to `Explanation`
6. The result is saved to localStorage query history (last 10 entries)

If the backend rejects the query or fails, the error is shown and any previous result is cleared.

## Project Structure