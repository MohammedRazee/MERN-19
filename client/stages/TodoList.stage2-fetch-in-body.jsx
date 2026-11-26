import { useState } from "react";
import { API_URL } from "../config.js";

function TodoList() {
  const [todos, setTodos] = useState([]);

  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => setTodos(data));

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
