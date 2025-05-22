import React from "react";
import TodoCard from "./TodoCard";
import { useDrop } from "react-dnd";

const getStatusColor = (title) => {
  return title === "Completed" ? "border-green-500" : title === "In Progress" ? "border-yellow-400" : "border-gray-300";
};

export default function Lane({ title, todos, onUpdate, onDelete }) {
  const [, drop] = useDrop({
    accept: "TODO",
    drop: (item) => {
      const isCompleted = title === "Completed";
      onUpdate(item.id, { completed: isCompleted, status: title, inProgress: title === "In Progress" });
    }
  });

  return (
    <div ref={drop} className={`bg-white border-t-4 ${getStatusColor(title)} p-4 rounded w-full md:w-1/3 min-h-[300px] min-w-[250px] shadow-sm transition-shadow hover:shadow-md`}>
      <h2 className="text-lg font-semibold mb-3 text-center">{title}</h2>
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            status={title}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
