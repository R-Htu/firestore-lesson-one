
import { useState } from "react";

function ContactForm3() {
  const [name, setName] = useState("");
  // YOUR CODE HERE: add state for email and message ↓

  const [submitted, setSubmitted] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    // YOUR CODE HERE: validate and set submitted data ↓
    console.log("Submitted:", { name });
  }

  return (
    <div style={{ maxWidth: "480px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>📬 Contact Form</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        {/* YOUR CODE HERE: email input ↓ */}

        {/* YOUR CODE HERE: message textarea ↓ */}

        <button type="submit" style={{ padding: "10px", background: "#2563eb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Submit
        </button>

        {/* YOUR CODE HERE: Clear button ↓ */}
      </form>

      {/* YOUR CODE HERE: display submitted summary box ↓ */}

    </div>
  );
}

export default ContactForm;
