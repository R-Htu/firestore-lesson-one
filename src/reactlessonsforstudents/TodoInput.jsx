
import { useState, useReducer, useEffect } from "react";

// ---- Reducer ----
function todosReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "CLEAR_COMPLETED":
      return state.filter((todo) => !todo.completed);
    case "LOAD_TODOS":
      return action.payload;
    default:
      return state;
  }
}

// ---- Custom Hook ----
function useLocalTodos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  // BONUS: YOUR CODE HERE — load todos from localStorage on mount ↓
  useEffect(() => {
    // const saved = localStorage.getItem("todos");
    // if (saved) dispatch({ type: "LOAD_TODOS", payload: JSON.parse(saved) });
  }, []);

  // BONUS: YOUR CODE HERE — save todos to localStorage whenever they change ↓
  useEffect(() => {
    // localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(text) {
    if (!text.trim()) return;
    dispatch({ type: "ADD_TODO", payload: text.trim() });
  }

  function toggleTodo(id) {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  }

  function deleteTodo(id) {
    dispatch({ type: "DELETE_TODO", payload: id });
  }

  function clearCompleted() {
    dispatch({ type: "CLEAR_COMPLETED" });
  }

  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted };
}

// ---- TodoInput Component ----
function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit() {
    onAdd(text);
    setText("");
  }

  // YOUR CODE HERE: handle Enter key press ↓

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        style={{ flex: 1, padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
        // YOUR CODE HERE: onKeyDown handler ↓
      />
      <button onClick={handleSubmit} style={{ padding: "10px 20px", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" }}>
        Add
      </button>
    </div>
  );
}

// ---- TodoFilters Component ----
function TodoFilters({ filter, onFilterChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
      {/* YOUR CODE HERE: render a button for each filter.
          Highlight the active one. Call onFilterChange(f) on click ↓ */}
    </div>
  );
}

// ---- TodoList Component ----
function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p style={{ color: "#94a3b8", textAlign: "center" }}>Nothing here! Add a task above 🎉</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {/* YOUR CODE HERE: map todos → each item has:
            - a checkbox (checked={todo.completed}, onChange calls onToggle)
            - the todo text (strike-through if completed)
            - a 🗑 delete button ↓ */}
    </ul>
  );
}

// ---- TodoStats Component ----
function TodoStats({ todos, onClearCompleted }) {
  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", color: "#64748b", fontSize: "14px" }}>
      <span>{activeCount} task{activeCount !== 1 ? "s" : ""} left</span>
      {/* YOUR CODE HERE: show "Clear Completed (N)" button only when completedCount > 0 ↓ */}
    </div>
  );
}

// ---- Main App ----
function TodoApp() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useLocalTodos();
  const [filter, setFilter] = useState("all");

  // YOUR CODE HERE: filter todos based on `filter` value ↓
  const filteredTodos = todos; // replace with filtered version

  return (
    <div style={{ maxWidth: "520px", margin: "60px auto", fontFamily: "'Segoe UI', sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "36px", marginBottom: "32px" }}>
        ✅ Todo App
      </h1>

      <TodoInput onAdd={addTodo} />
      <TodoFilters filter={filter} onFilterChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <TodoStats todos={todos} onClearCompleted={clearCompleted} />
    </div>
  );
}

export default TodoApp;
