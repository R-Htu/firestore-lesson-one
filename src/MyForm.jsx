import { useState } from 'react';
import { createRoot } from 'react-dom/client';

export function MyForm() {
  const [name, setName] = useState("hames");

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form>
      <label>Enter your name:
        <input
          type="text" 
          value={name}
          onChange={handleChange}
        />
      </label>
      <p>Current value: {name}</p>
    </form>
  )
}
