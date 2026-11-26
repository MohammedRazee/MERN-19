import { useEffect, useState } from "react";
import { API_URL } from "../config.js";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function loadTodos() {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    }
    loadTodos();
  }, []);

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
