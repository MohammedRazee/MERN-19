# Stage files

Copy the stage you want over `src/components/TodoList.jsx`.

| File | What it shows |
|---|---|
| `TodoList.stage2-fetch-in-body.jsx` | `fetch` written straight in the component. With no CORS on the server: red CORS error. With CORS on: endless requests. |
| `TodoList.stage4-useEffect.jsx` | `fetch` inside `useEffect(..., [])`. Asks once (twice in development, see StrictMode). |
| `TodoList.stage5-final.jsx` | Adds Loading, error and "No tasks yet" messages. Same as `src/components/TodoList.jsx`. |
