"use client";

import { useTodos, useAddTodo, useToggleTodo, useDeleteTodo } from "@/hooks/use-todos";
import React, { useState } from "react";

export default function TodosComponent() {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const { data: todos, isLoading, error } = useTodos();
  const addTodo = useAddTodo();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    addTodo.mutate(newTodoTitle.trim(), {
      onSuccess: () => setNewTodoTitle(""),
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">Failed to load todos: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Todos</h2>

      <form onSubmit={handleAddTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={addTodo.isPending}
          />
          <button type="submit" disabled={addTodo.isPending || !newTodoTitle.trim()} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors">
            {addTodo.isPending ? "Adding..." : "Add"}
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {!todos || todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No todos yet. Add your first todo above!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <input type="checkbox" checked={todo.completed} onChange={(e) => toggleTodo.mutate({ id: todo.id, completed: e.target.checked })} className="w-5 h-5 text-blue-600 rounded" disabled={toggleTodo.isPending} />
              <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}>{todo.title}</span>
              <button onClick={() => deleteTodo.mutate(todo.id)} disabled={deleteTodo.isPending} className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {todos && todos.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total: {todos.length}</span>
            <span>Completed: {todos.filter((t) => t.completed).length}</span>
            <span>Pending: {todos.filter((t) => !t.completed).length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
