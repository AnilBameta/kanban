import React, { useEffect, useState } from "react";
import { fetchTodos, createTodo, deleteTodo } from "./services/todoService";
import KanbanBoard from "./components/KanbanBoard";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  const handleCreate = async (todoText) => {
    const newTodo = await createTodo(todoText);
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleUpdate = async (id, updatedFields) => {
    // const updatedTodo = await updateTodo(id, updatedFields);
    setTodos((prev) => prev.map(t => t.id === id ? {...t,...updatedFields} : t));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-200 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Kanban Todo Board</h1>
      <TodoForm onSubmit={handleCreate} />
      <KanbanBoard todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}