import React from "react";
import Lane from "./Lane";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const STATUS = ["Pending", "In Progress", "Completed"];

function mapStatus(todo) {
    if (todo.status) return todo.status;
    return todo.inProgress ? 'In Progress' : todo.completed ? "Completed" : "Pending";
  }

export default function KanbanBoard({ todos, onUpdate, onDelete }) {
  const grouped = STATUS.reduce((acc, status) => {
    acc[status] = todos.filter((todo) => mapStatus(todo) === status);
    return acc;
  }, {});

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col md:flex-row gap-4 items-start justify-center">
        {STATUS.map((status) => (   
          <Lane
            key={status}
            title={status}
            todos={grouped[status] || []}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </DndProvider>
  );
}