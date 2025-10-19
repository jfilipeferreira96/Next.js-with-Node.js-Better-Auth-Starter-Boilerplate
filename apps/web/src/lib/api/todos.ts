const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

async function api<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `Error: ${res.status}`);
  }

  return res.json();
}

export const todosApi = {
  getAll: () => api<Todo[]>("/todos"),

  create: (title: string) =>
    api<Todo>("/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    }),

  update: (id: string, completed: boolean) =>
    api<Todo>(`/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed }),
    }),

  delete: (id: string) => api<void>(`/todos/${id}`, { method: "DELETE" }),
};
