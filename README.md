# To-Do MERN demo (Session 19)

Two small projects in one folder:

- `server/` — Express + Mongoose. One route: `GET /api/todos`.
- `client/` — React (Vite) + Bootstrap. Asks the server for the tasks and shows them.

```
 Browser (React, :5173)  --fetch-->  Express (:5000)  --Mongoose-->  MongoDB (:27017)
```

## Needs

- Node 20.19 or newer (Vite 8 and Mongoose 9 need it). Check with `node -v`.
- MongoDB running on `localhost:27017` (instructor: `podman start mongodb`).

## Run it (three terminals)

```bash
# 1. MongoDB (instructor's Podman container)
podman start mongodb

# 2. Server
cd server
cp .env.example .env
npm install
npm run dev            # http://localhost:5000/api/todos

# 3. Client
cd client
npm install
npm run dev            # http://localhost:5173
```

The page shows "No tasks yet." until you insert data. In `mongosh`:

```js
use todoapp
db.todos.insertMany([
  { text: "Buy milk", done: false },
  { text: "Finish lab record", done: true },
  { text: "Call the bank", done: false }
])
```

## Stage files

`client/stages/` holds the `TodoList.jsx` of each teaching stage. Copy one over
`client/src/components/TodoList.jsx` to jump to that stage. `src/` holds the finished version.

## Tests

`cd client && npm test` (six tests, fetch is faked).
