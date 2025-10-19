import type { Request, Response } from "express";
import prisma from "@better-auth-nodejs-nextjs/db";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    const todos = await prisma.todo.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { title } = req.body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ error: "Title is required" });
    }

    const todo = await prisma.todo.create({
      data: {
        title: title.trim(),
        userId: user.id,
      },
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Todo ID is required" });
    }

    // Check if the todo belongs to the user
    const existingTodo = await prisma.todo.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await prisma.todo.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const toggleTodo = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { completed } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Todo ID is required" });
    }

    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "Completed status is required" });
    }

    // Check if the todo belongs to the user
    const existingTodo = await prisma.todo.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed,
      },
    });

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error toggling todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
