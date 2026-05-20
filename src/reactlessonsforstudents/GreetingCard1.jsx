
function GreetingCard1({ name }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", margin: "8px", borderRadius: "8px" }}>
      <h2>👋 Hello, {name}!</h2>
      {/* YOUR CODE HERE: display role (and bonus: age) ↓ */}

    </div>
  );
}

function PropResult() {
  return (
    <div>
      <h1>Team Directory</h1>
      <GreetingCard name="Alice" />
      {/* YOUR CODE HERE: add two more GreetingCard components ↓ */}

    </div>
  );
}

export default PropResult;
