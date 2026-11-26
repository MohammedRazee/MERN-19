import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Todo from "./models/Todo.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Lets the React app (another address) read our answers
app.use(cors());

// Logger (same idea as Session 8): print every request that arrives
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// The only route: send every task, as JSON
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
