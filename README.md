# AI SQL Query Explainer — Frontend

A React + TypeScript single-page app that lets you paste a SQL query and get back a plain-English explanation, performance warnings, an ERD description, and optimization suggestions — powered by an AI backend.

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** as the build tool / dev server
- **Tailwind CSS v4** (via the `@tailwindcss/vite` plugin) for styling

## How It Works

1. The user types or pastes a SQL query into the textarea in `QueryInput`.
2. Clicking **"Explain This Query"** sends a `POST` request from `App.tsx` to the backend at `http://localhost:8000/api/explain`.
3. The backend validates the query, sends it to Gemini, and returns a structured JSON object.
4. `App.tsx` stores that response in state and passes it down to `Explanation`, which renders it as four sections: Explanation, Performance Issues, ERD Description, and Optimizations.

If the backend rejects the query (invalid SQL) or fails (AI call error, bad JSON), `App.tsx` catches that and displays an error message instead — and clears any previous result so old and new data never overlap on screen.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── QueryInput.tsx      # SQL input textarea + submit button
│   │   └── Explanation.tsx     # Renders the AI's structured response
│   ├── App.tsx                 # Owns state, handles the API call
│   ├── main.tsx                 # React entry point
│   └── index.css                # Tailwind import
├── index.html
├── package.json
└── vite.config.ts               # React + Tailwind plugins
```

## File-by-File Breakdown

### `App.tsx`
The top-level component. Holds three pieces of state:
- `result` — the parsed explanation data, or `null`
- `loading` — true while waiting on the backend
- `error` — an error message string, or empty

`handleExplain(query)` is passed down to `QueryInput`. It resets `error` and `result` on every new request, calls the backend, and either populates `result` or sets `error` based on the response. The `loading` state disables the submit button and changes its label while the request is in flight.

### `components/QueryInput.tsx`
A controlled textarea pre-filled with an example query (`SELECT * FROM Orders WHERE Status = 'Pending';`). Keeps its own local state for the typed query, and calls the `onExplain` prop with the current text when the button is clicked. The button is disabled while `loading` is true.

### `components/Explanation.tsx`
A purely presentational component — takes a `data` prop matching the backend's response shape and renders it:
- `explanation` — always shown
- `performance_issues` — only rendered if the array is non-empty (styled as a yellow warning box)
- `erd_description` — always shown
- `optimizations` — only rendered if the array is non-empty (styled in green)

### `main.tsx`
Standard Vite/React entry point — mounts `<App />` into the DOM.

### `vite.config.ts`
Registers two plugins: `@vitejs/plugin-react` (JSX/Fast Refresh support) and `@tailwindcss/vite` (Tailwind v4 integration — no separate `tailwind.config.js` needed).

### `index.css`
A single `@import "tailwindcss";` — that's the entire stylesheet. All visual styling comes from Tailwind utility classes directly in the components.

## Setup & Running

```bash
npm install
npm run dev
```

The app expects the backend to be running separately at `http://localhost:8000`. See the backend's own README/setup docs for how to start it. Without the backend running, you'll see a "Failed to load resource" error in the browser console when you try to explain a query.

## Known Limitations / Future Work

- The backend URL (`http://localhost:8000`) is hardcoded in `App.tsx` — this will need to move to an environment variable (`import.meta.env.VITE_API_URL`) before deploying anywhere beyond local dev.
- No query history, copy-to-clipboard, or SQL syntax highlighting yet.
- No loading skeleton — the button label is currently the only loading indicator.