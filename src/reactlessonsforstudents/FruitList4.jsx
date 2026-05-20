
import { useState } from "react";

const initialFruits = [
  { id: 1, name: "🍎 Apple" },
  { id: 2, name: "🍌 Banana" },
  { id: 3, name: "🍇 Grapes" },
  { id: 4, name: "🍊 Orange" },
  { id: 5, name: "🍓 Strawberry" },
];

function FruitList4() {
  // YOUR CODE HERE: move fruits into useState ↓
  const fruits = initialFruits;

  const [newFruit, setNewFruit] = useState("");
  const [search, setSearch] = useState("");

  function handleAdd() {
    // YOUR CODE HERE: add newFruit to the list ↓
  }

  function handleDelete(id) {
    // YOUR CODE HERE: remove fruit with matching id ↓
  }

  // YOUR CODE HERE: create filteredFruits by filtering on search ↓
  const filteredFruits = fruits;

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>🍑 Fruit List</h1>

      {/* Search input */}
      <input
        placeholder="Search fruits..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      {/* Add new fruit */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          placeholder="New fruit name..."
          value={newFruit}
          onChange={(e) => setNewFruit(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={handleAdd} style={{ padding: "8px 16px" }}>Add</button>
      </div>

      {/* YOUR CODE HERE: render filteredFruits as a list with delete buttons ↓ */}
      <ul>
        {/* map goes here */}
      </ul>

      {/* YOUR CODE HERE: "No fruits found" message ↓ */}

    </div>
  );
}

export default FruitList;
