import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "path";
import { auth } from "@better-auth-nodejs-nextjs/auth";
import { toNodeHandler } from "better-auth/node";
import Logger from "./lib/logger";
import { getTodos, addTodo, deleteTodo, toggleTodo } from "./controllers/todosController";
import { requireAuth } from "./middlewares/authMiddleware";
import { fileURLToPath } from "url";

const app = express();

// --- CORS ---
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3001", // Frontend
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// --- Better Auth handler ---
app.all("/api/auth{/*path}", toNodeHandler(auth));


// --- Serve static files ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// --- Todos routes (authenticated) ---
app.get("/todos", requireAuth, getTodos);
app.post("/todos", requireAuth, addTodo);
app.delete("/todos/:id", requireAuth, deleteTodo);
app.patch("/todos/:id", requireAuth, toggleTodo);

// --- Start server ---
const port = process.env.PORT || 3000;
app.listen(port, () => {
  Logger.info(`Server is running on port ${port}`);
});
