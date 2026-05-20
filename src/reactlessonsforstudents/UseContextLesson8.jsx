
import { useState, useContext, createContext } from "react";

// YOUR CODE HERE: create ThemeContext ↓
// const ThemeContext = createContext();

const themes = {
  light: { background: "#ffffff", text: "#1e293b", card: "#f1f5f9", border: "#e2e8f0" },
  dark:  { background: "#0f172a", text: "#f1f5f9", card: "#1e293b", border: "#334155" },
};

// ---- Navbar ----
function Navbar() {
  // YOUR CODE HERE: consume ThemeContext ↓
  // const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #ccc" }}>
      <h2 style={{ margin: 0 }}>⚛️ My App</h2>
      {/* YOUR CODE HERE: show current theme name and a toggle button ↓ */}
      <button onClick={() => {}}>Toggle Theme</button>
    </nav>
  );
}

// ---- Card ----
function Card({ title, body }) {
  // YOUR CODE HERE: consume ThemeContext ↓
  // const { theme } = useContext(ThemeContext);
  // const colors = themes[theme];

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

// ---- Page ----
function Page() {
  // YOUR CODE HERE: consume ThemeContext and apply background/text styles ↓

  return (
    <main style={{ padding: "24px", minHeight: "100vh" }}>
      <Card title="🚀 Getting Started" body="Welcome to your first context-powered app. Toggle the theme above!" />
      <Card title="📚 Learn More" body="useContext lets any descendant access shared state without prop drilling." />
      <Card title="🎨 Theming" body="This entire page responds to one piece of state stored in a Context Provider." />
    </main>
  );
}


function UseContextLesson8() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  // YOUR CODE HERE: wrap with ThemeContext.Provider ↓
  return (
    <div>
      <Navbar />
      <Page />
    </div>
  );
}

export default UseContextLesson8;
