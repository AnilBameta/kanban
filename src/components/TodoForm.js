import React, { useState } from "react";

export default function TodoForm({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-t-4 border-blue-400 p-4 rounded w-full md:w-1/3 shadow-sm h-fit mb-5">
      <h2 className="font-semibold mb-2 text-center">Add Todo</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
        className="w-full border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
        Add Task
      </button>
    </form>
  );
}
