
import { useState } from "react";

function Counter2() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  // YOUR CODE HERE: add handleDecrement and handleReset functions ↓

  return (
    <div style={{ textAlign: "center", padding: "32px" }}>
      <h1>🔢 Counter</h1>

      {/* BONUS: apply color style based on count value */}
      <p style={{ fontSize: "64px", fontWeight: "bold" }}>{count}</p>

      <button onClick={handleIncrement} style={{ margin: "8px", padding: "10px 20px", fontSize: "16px" }}>
        ➕ Increment
      </button>

      {/* YOUR CODE HERE: Decrement and Reset buttons ↓ */}

    </div>
  );
}

export default Counter;
