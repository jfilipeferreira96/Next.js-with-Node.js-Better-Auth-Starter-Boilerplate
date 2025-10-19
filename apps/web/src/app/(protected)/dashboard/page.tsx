"use client";
import { useUser } from "@/contexts/AuthContext";
import React from "react";
import TodosComponent from "@/components/todos/TodosComponent";

export default function Dashboard() {
  const { user, signOut } = useUser();
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

          {user && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Welcome back, <span className="font-semibold">{user.name || user.email}</span>!
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => signOut()}
              className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Todos Section */}
        <TodosComponent />
      </div>
    </div>
  );
}
