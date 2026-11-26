import { useEffect, useState } from "react";
import { API_URL } from "../config.js";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTodos() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Server answered " + res.status);
        }
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error("Load failed:", err.message);
        setError("Could not load the tasks. Is the server running?");
      } finally {
        setLoading(false);
      }
    }
    loadTodos();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading tasks...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (todos.length === 0) {
    return <div className="alert alert-warning">No tasks yet.</div>;
  }

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li key={todo._id} className="list-group-item">
          {todo.done ? "✅" : "⬜"} {todo.text}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
