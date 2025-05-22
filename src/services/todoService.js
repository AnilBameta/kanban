const API_BASE = "https://dummyjson.com/todos";

export async function fetchTodos() {
    const res = await fetch(`${API_BASE}?limit=100`);
    const data = await res.json();
    // Add default 'status' if missing, map 'inProgress' flag
    return data.todos.map(todo => ({
      ...todo,
      status: todo.status || (todo.completed ? "Completed" : "Pending"),
      inProgress: false
    }));
  }

export async function createTodo(todoText) {
  const res = await fetch(API_BASE + "/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo: todoText, completed: false, userId: 1, status: "Pending" })
  });
  return res.json();
}

export async function updateTodo(id, updatedFields) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields)
  });
  return res.json();
}

export async function deleteTodo(id) {
  await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
}