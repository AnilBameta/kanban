import React, { useState } from "react";
import { useDrag } from "react-dnd";

export default function TodoCard({ todo, status, onUpdate, onDelete }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TODO",
    item: { id: todo.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [todo.id]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.todo);

  const toggleCompletion = () => {
    const isCompleted = status === "Completed";
    onUpdate(todo.id, { completed: !isCompleted, status: isCompleted ? "Pending" : "Completed" });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedText.trim()) {
      onUpdate(todo.id, { todo: editedText });
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={drag}
      className={`bg-white p-3 rounded shadow flex justify-between items-start transition-transform duration-200 ease-in-out ${isDragging ? "scale-95 opacity-50" : "hover:scale-[1.02]"}`}
    >
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleSave}
            className="w-full border px-2 py-1 rounded text-sm text-gray-800"
            autoFocus
          />
        ) : (
          <p
            className="font-medium text-gray-800 cursor-pointer"
            onClick={handleEdit}
            title="Click to edit"
          >
            {todo.todo}
          </p>
        )}
        <p className="text-sm text-gray-400">Status: {status}</p>
      </div>
      <div className="space-x-2 text-sm">
        <button
          className="text-green-600 hover:underline"
          onClick={toggleCompletion}
        >
          {status === "Completed" ? "Undo" : "Done"}
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
