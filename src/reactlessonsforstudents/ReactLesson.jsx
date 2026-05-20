import { useState, useContext, createContext, useEffect, useCallback } from "react";

// ─── COLOR PALETTE ────────────────────────────────────────────────────────────
const TOPICS = [
  { id: 0,  label: "Component Composition", emoji: "🧩" },
  { id: 1,  label: "Props Deeply",           emoji: "📦" },
  { id: 2,  label: "Conditional Rendering",  emoji: "🔀" },
  { id: 3,  label: "Lists & Keys",           emoji: "📋" },
  { id: 4,  label: "Form Handling",          emoji: "📝" },
  { id: 5,  label: "Lifting State Up",       emoji: "⬆️" },
  { id: 6,  label: "Context API",            emoji: "🌐" },
  { id: 7,  label: "Routing Concepts",       emoji: "🗺️" },
  { id: 8,  label: "Async Data Fetching",    emoji: "⚡" },
  { id: 9,  label: "Custom Hooks",           emoji: "🪝" },
  { id: 10, label: "Project Structure",      emoji: "🏗️" },
  { id: 11, label: "State Flow Thinking",    emoji: "🔄" },
];

// ─── SHARED UI PRIMITIVES ─────────────────────────────────────────────────────
function Code({ children }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ position: "relative", margin: "12px 0" }}>
      <pre style={{
        background: "#0f1117", color: "#e2e8f0", borderRadius: 10,
        padding: "16px 20px", fontSize: 13, lineHeight: 1.7,
        overflow: "auto", margin: 0, fontFamily: "monospace",
        border: "1px solid #1e2535"
      }}>{children}</pre>
      <button onClick={copy} style={{
        position: "absolute", top: 8, right: 8,
        background: copied ? "#22c55e22" : "#ffffff12",
        border: "1px solid #ffffff22", color: copied ? "#22c55e" : "#94a3b8",
        borderRadius: 6, padding: "3px 10px", fontSize: 11, cursor: "pointer"
      }}>{copied ? "✓ copied" : "copy"}</button>
    </div>
  );
}

function Callout({ type = "info", children }) {
  const styles = {
    info:    { bg: "#1e3a5f", border: "#3b82f6", icon: "💡" },
    success: { bg: "#14432a", border: "#22c55e", icon: "✅" },
    warn:    { bg: "#3d2a00", border: "#f59e0b", icon: "⚠️" },
  };
  const s = styles[type];
  return (
    <div style={{
      background: s.bg, borderLeft: `3px solid ${s.border}`,
      borderRadius: "0 8px 8px 0", padding: "10px 14px",
      fontSize: 13, color: "#cbd5e1", margin: "12px 0", lineHeight: 1.6
    }}>
      {s.icon} {children}
    </div>
  );
}

function Tag({ children, color = "#3b82f6" }) {
  return (
    <span style={{
      background: color + "22", color,
      border: `1px solid ${color}44`,
      borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 600
    }}>{children}</span>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 style={{
      color: "#f1f5f9", fontSize: 15, fontWeight: 600,
      margin: "20px 0 6px", borderBottom: "1px solid #1e2535", paddingBottom: 6
    }}>{children}</h3>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#1a1f2e", border: "1px solid #2d3748",
      borderRadius: 10, padding: 16, margin: "8px 0", ...style
    }}>{children}</div>
  );
}

function Button({ label, variant = "primary", size = "md", onClick, disabled = false }) {
  const variants = { primary: "#6366f1", success: "#22c55e", danger: "#ef4444", ghost: "transparent" };
  const sizes    = { sm: "6px 12px", md: "8px 18px", lg: "12px 26px" };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: variants[variant] + (variant === "ghost" ? "" : "22"),
      border: `1px solid ${variants[variant]}`,
      color: variant === "ghost" ? "#94a3b8" : variants[variant],
      borderRadius: 8, padding: sizes[size], fontSize: 13,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1, fontWeight: 600, transition: "all .15s"
    }}>{label}</button>
  );
}

// ─── LESSON 0: COMPONENT COMPOSITION ─────────────────────────────────────────
function Avatar({ name, size = 40 }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const colors   = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];
  const color    = colors[name.charCodeAt(0) % colors.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color + "33", border: `2px solid ${color}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 700, color, flexShrink: 0
    }}>{initials}</div>
  );
}

function UserCard({ name, role, online }) {
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar name={name} />
        <div>
          <div style={{ fontWeight: 600, color: "#f1f5f9", fontSize: 14 }}>{name}</div>
          <div style={{ color: "#64748b", fontSize: 12 }}>{role}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: online ? "#22c55e" : "#64748b" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: online ? "#22c55e" : "#64748b" }} />
          {online ? "Online" : "Offline"}
        </div>
      </div>
    </Card>
  );
}

function Lesson0() {
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>
        Build complex UIs by combining small, reusable components — like LEGO bricks.
      </p>
      <SectionTitle>Live Demo</SectionTitle>
      <UserCard name="Ana Lima"   role="Frontend Dev" online={true}  />
      <UserCard name="João Silva" role="Backend Dev"  online={false} />
      <Callout type="info">
        The <code style={{color:"#7dd3fc"}}>UserCard</code> component reuses <code style={{color:"#7dd3fc"}}>Avatar</code> and{" "}
        <code style={{color:"#7dd3fc"}}>Card</code>. Each does one job.
      </Callout>
      <SectionTitle>Code</SectionTitle>
      <Code>{`// Small, focused components
function Avatar({ name }) {
  return <div className="avatar">{name[0]}</div>;
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Compose them together
function UserCard({ name, role }) {
  return (
    <Card>
      <Avatar name={name} />
      <p>{name} — {role}</p>
    </Card>
  );
}

// Use it anywhere
<UserCard name="Ana Lima" role="Frontend Dev" />`}</Code>
      <Callout type="success">Rule: one component = one responsibility. Small components = easier to test, reuse, and maintain.</Callout>
    </div>
  );
}

// ─── LESSON 1: PROPS DEEPLY ───────────────────────────────────────────────────
function Lesson1() {
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>
        Props are how parent components pass data &amp; behavior down to children. Think of them as function arguments.
      </p>
      <SectionTitle>Live Demo — same component, different props</SectionTitle>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "10px 0" }}>
        <Button label="Primary"  variant="primary"  />
        <Button label="Success"  variant="success"  />
        <Button label="Danger"   variant="danger"   />
        <Button label="Ghost"    variant="ghost"    />
        <Button label="Small"    size="sm"          />
        <Button label="Disabled" disabled           />
      </div>
      <SectionTitle>Code</SectionTitle>
      <Code>{`// Props = named parameters for components
function Button({ label, variant = "primary", size = "md", disabled = false }) {
  return (
    <button
      disabled={disabled}
      className={\`btn btn-\${variant} btn-\${size}\`}
    >
      {label}
    </button>
  );
}

// Parent controls everything via props
<Button label="Save"    variant="primary" />
<Button label="Delete"  variant="danger" />
<Button label="Loading" disabled={true} />
// Props can be: strings, numbers, booleans,
// arrays, objects, even functions (callbacks)!
<Button onClick={() => alert("clicked!")} label="Click me" />`}</Code>
      <Callout type="warn">Props flow <strong>one way</strong>: parent → child. A child can never modify props directly. Use callbacks to send data back up.</Callout>
      <Callout type="info">Default values (like <code style={{color:"#7dd3fc"}}>variant = "primary"</code>) make props optional and safe.</Callout>
    </div>
  );
}

// ─── LESSON 2: CONDITIONAL RENDERING ─────────────────────────────────────────
function Lesson2() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role,       setRole]       = useState("viewer");
  const [loading,    setLoading]    = useState(false);

  const simulateLogin = () => {
    setLoading(true);
    setTimeout(() => { setIsLoggedIn(true); setLoading(false); }, 1000);
  };

  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>
        Render different UI based on conditions — like if/else but inside JSX.
      </p>
      <SectionTitle>Live Demo</SectionTitle>
      <Card>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <Button
            label={isLoggedIn ? "Logout" : "Login"}
            variant={isLoggedIn ? "danger" : "primary"}
            onClick={() => isLoggedIn ? setIsLoggedIn(false) : simulateLogin()}
          />
          {isLoggedIn && (
            <select value={role} onChange={e => setRole(e.target.value)} style={{
              background: "#0f1117", color: "#e2e8f0", border: "1px solid #2d3748",
              borderRadius: 8, padding: "6px 10px", fontSize: 13
            }}>
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          )}
        </div>

        {loading && <div style={{ color: "#f59e0b", fontSize: 13 }}>⏳ Logging in...</div>}

        {!loading && !isLoggedIn && (
          <div style={{ color: "#64748b", fontSize: 13 }}>🔒 Please log in to continue</div>
        )}

        {!loading && isLoggedIn && (
          <div>
            <div style={{ color: "#22c55e", fontSize: 13 }}>✅ Welcome back!</div>
            {role === "admin"  && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 6 }}>🛡️ Admin panel visible</div>}
            {role === "editor" && <div style={{ color: "#6366f1", fontSize: 12, marginTop: 6 }}>✏️ Edit mode enabled</div>}
            {role === "viewer" && <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 6 }}>👁️ View-only access</div>}
          </div>
        )}
      </Card>

      <SectionTitle>Code</SectionTitle>
      <Code>{`// 3 main patterns for conditional rendering:

// 1. Ternary — show A or B
{isLoggedIn ? <Dashboard /> : <LoginPage />}

// 2. && short-circuit — show or hide
{isAdmin && <AdminPanel />}

// 3. Early return — simplest for big branches
function Page({ loading, error, data }) {
  if (loading) return <Spinner />;
  if (error)   return <ErrorMessage />;
  return <DataView data={data} />;
}`}</Code>
      <Callout type="info">Prefer early returns for large conditional branches — keeps JSX clean and readable.</Callout>
    </div>
  );
}

// ─── LESSON 3: LISTS & KEYS ───────────────────────────────────────────────────
function Lesson3() {
  const [items, setItems] = useState([
    { id: 1, text: "Learn React",          done: true  },
    { id: 2, text: "Build a project",      done: false },
    { id: 3, text: "Deploy to production", done: false },
  ]);
  const [input, setInput] = useState("");

  const addItem  = () => {
    if (!input.trim()) return;
    setItems(prev => [...prev, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  };
  const toggle = (id) => setItems(prev => prev.map(i  => i.id === id ? { ...i, done: !i.done } : i));
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>
        Use <code style={{color:"#7dd3fc"}}>.map()</code> to render lists. Keys help React track which items changed, added, or removed.
      </p>
      <SectionTitle>Live Demo</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addItem()}
          placeholder="Add a task..."
          style={{ flex: 1, background: "#0f1117", color: "#e2e8f0", border: "1px solid #2d3748", borderRadius: 8, padding: "8px 12px", fontSize: 13 }}
        />
        <Button label="Add" variant="primary" onClick={addItem} />
      </div>
      {items.map(item => (
        <div key={item.id} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "8px 12px", background: "#1a1f2e",
          borderRadius: 8, marginBottom: 6, border: "1px solid #2d3748",
          opacity: item.done ? 0.6 : 1
        }}>
          <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} style={{ width: 15, height: 15, cursor: "pointer" }} />
          <span style={{ flex: 1, fontSize: 13, color: "#e2e8f0", textDecoration: item.done ? "line-through" : "none" }}>{item.text}</span>
          <span style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>id:{item.id.toString().slice(-4)}</span>
          <button onClick={() => remove(item.id)} style={{ background: "none", border: "none", color: "#ef444488", cursor: "pointer", fontSize: 14 }}>✕</button>
        </div>
      ))}
      <div style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>
        {items.length} items · {items.filter(i => i.done).length} done
      </div>

      <SectionTitle>Code</SectionTitle>
      <Code>{`const items = [
  { id: 1, text: "Learn React", done: true },
  { id: 2, text: "Build a project", done: false },
];

// .map() transforms data → JSX elements
// key must be UNIQUE and STABLE (not array index!)
function List() {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>          {/* ← key is required */}
          {item.done ? "✅" : "⬜"} {item.text}
        </li>
      ))}
    </ul>
  );
}

// ❌ BAD — using index as key breaks on reorder/delete
{items.map((item, index) => <li key={index}>{item.text}</li>)}

// ✅ GOOD — use stable unique IDs
{items.map(item => <li key={item.id}>{item.text}</li>)}`}</Code>
      <Callout type="warn">Never use array index as key if the list can be sorted, filtered, or have items removed — it causes bugs!</Callout>
    </div>
  );
}

// ─── LESSON 4: FORM HANDLING ──────────────────────────────────────────────────
function Lesson4() {
  const [form,      setForm]      = useState({ name: "", email: "", role: "student", agree: false });
  const [submitted, setSubmitted] = useState(null);
  const [errors,    setErrors]    = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name  = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.agree)               e.agree = "Must agree to terms";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev  => ({ ...prev,  [name]: type === "checkbox" ? checked : value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitted(form);
  };

  const inputStyle = (field) => ({
    width: "100%", boxSizing: "border-box",
    background: "#0f1117", color: "#e2e8f0",
    border: `1px solid ${errors[field] ? "#ef4444" : "#2d3748"}`,
    borderRadius: 8, padding: "8px 12px", fontSize: 13
  });

  if (submitted) return (
    <Card style={{ borderColor: "#22c55e44" }}>
      <div style={{ color: "#22c55e", fontWeight: 600, marginBottom: 8 }}>✅ Form submitted!</div>
      <pre style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{JSON.stringify(submitted, null, 2)}</pre>
      <div style={{ marginTop: 10 }}>
        <Button label="Reset" variant="ghost" onClick={() => { setSubmitted(null); setForm({ name: "", email: "", role: "student", agree: false }); }} />
      </div>
    </Card>
  );

  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>
        In React, form inputs are <strong style={{color:"#e2e8f0"}}>controlled</strong> — state owns the value, not the DOM.
      </p>
      <SectionTitle>Live Demo</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 4 }}>Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" style={inputStyle("name")} />
          {errors.name && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 3 }}>{errors.name}</div>}
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 4 }}>Email</label>
          <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle("email")} />
          {errors.email && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 3 }}>{errors.email}</div>}
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 4 }}>Role</label>
          <select name="role" value={form.role} onChange={handleChange} style={{ ...inputStyle("role"), width: "auto" }}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} id="agree" />
          <label htmlFor="agree" style={{ fontSize: 13, color: "#94a3b8" }}>I agree to the terms</label>
        </div>
        {errors.agree && <div style={{ color: "#ef4444", fontSize: 11 }}>{errors.agree}</div>}
        <Button label="Submit" variant="primary" onClick={handleSubmit} />
      </div>

      <SectionTitle>Code</SectionTitle>
      <Code>{`function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  // One handler for all fields using [name] computed key
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Submitted:", form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}       // ← controlled: state is source of truth
        onChange={handleChange} // ← updates state on every keystroke
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`}</Code>
      <Callout type="info">The pattern <code style={{color:"#7dd3fc"}}>value + onChange</code> = controlled input. React state drives the UI, not the DOM.</Callout>
    </div>
  );
}

// ─── LESSON 5: LIFTING STATE UP ───────────────────────────────────────────────
function TemperatureInput({ scale, temp, onTempChange }) {
  return (
    <Card>
      <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>
        Temperature in {scale === "C" ? "°Celsius" : "°Fahrenheit"}
      </label>
      <input
        type="number" value={temp}
        onChange={e => onTempChange(Number(e.target.value))}
        style={{ width: "100%", boxSizing: "border-box", background: "#0f1117", color: "#e2e8f0", border: "1px solid #2d3748", borderRadius: 8, padding: "8px 12px", fontSize: 20, fontWeight: 700 }}
      />
    </Card>
  );
}

function Lesson5() {
  const [celsius, setCelsius] = useState(100);
  const fahrenheit = celsius * 9 / 5 + 32;
  const handleC    = (v) => setCelsius(v);
  const handleF    = (v) => setCelsius((v - 32) * 5 / 9);
  const status     = celsius >= 100 ? "🔴 Boiling!" : celsius <= 0 ? "🔵 Freezing!" : "🟢 Normal";

  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>
        When two sibling components need to share state, move the state to their closest common parent.
      </p>
      <SectionTitle>Live Demo — edit either field</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <TemperatureInput scale="C" temp={celsius.toFixed(1)}    onTempChange={handleC} />
        <TemperatureInput scale="F" temp={fahrenheit.toFixed(1)} onTempChange={handleF} />
      </div>
      <div style={{ textAlign: "center", fontSize: 16, padding: 10, color: "#e2e8f0" }}>{status}</div>
      <Callout type="info">
        The parent owns <code style={{color:"#7dd3fc"}}>celsius</code>. Both inputs get values from it, and report changes back up via{" "}
        <code style={{color:"#7dd3fc"}}>onTempChange</code>.
      </Callout>
      <SectionTitle>Code</SectionTitle>
      <Code>{`// ❌ Before lifting — siblings can't talk to each other
function CelsiusInput() {
  const [temp, setTemp] = useState(0); // trapped here!
}
function FahrenheitInput() {
  const [temp, setTemp] = useState(0); // different state, not synced!
}

// ✅ After lifting — parent owns the state
function TempConverter() {
  const [celsius, setCelsius] = useState(0); // lifted up here

  const fahrenheit = celsius * 9/5 + 32;

  return (
    <>
      {/* pass down value + callback to each child */}
      <CelsiusInput
        value={celsius}
        onChange={(v) => setCelsius(v)}
      />
      <FahrenheitInput
        value={fahrenheit}
        onChange={(v) => setCelsius((v - 32) * 5/9)}
      />
    </>
  );
}`}</Code>
    </div>
  );
}

// ─── LESSON 6: CONTEXT API ────────────────────────────────────────────────────
const ThemeContext = createContext("light");

function ThemedBox({ label }) {
  const theme  = useContext(ThemeContext);
  const isDark = theme === "dark";
  return (
    <div style={{
      background: isDark ? "#1a1f2e" : "#f1f5f9",
      color:      isDark ? "#e2e8f0" : "#1e293b",
      border: `1px solid ${isDark ? "#2d3748" : "#cbd5e1"}`,
      borderRadius: 8, padding: "10px 14px", fontSize: 13, margin: "6px 0"
    }}>
      <span style={{ opacity: 0.5, fontSize: 11 }}>{label} sees theme: </span>
      <strong>{theme}</strong>
    </div>
  );
}

function Lesson6() {
  const [theme, setTheme] = useState("light");
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>
        Context lets you share data across the whole component tree — no manual prop drilling.
      </p>
      <SectionTitle>Live Demo</SectionTitle>
      <Button
        label={`Switch to ${theme === "light" ? "Dark" : "Light"}`}
        variant="primary"
        onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
      />
      <ThemeContext.Provider value={theme}>
        <div style={{ marginTop: 10 }}>
          <ThemedBox label="Grandparent" />
          <div style={{ paddingLeft: 16, borderLeft: "2px solid #2d3748", marginLeft: 10 }}>
            <ThemedBox label="Parent" />
            <div style={{ paddingLeft: 16, borderLeft: "2px solid #2d3748", marginLeft: 10 }}>
              <ThemedBox label="Child" />
              <div style={{ paddingLeft: 16, borderLeft: "2px solid #2d3748", marginLeft: 10 }}>
                <ThemedBox label="Deep Grandchild" />
              </div>
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
      <SectionTitle>Code</SectionTitle>
      <Code>{`// 1. Create the context
const ThemeContext = createContext("light");

// 2. Provide it at the top of your tree
function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <Page />  {/* no props needed! */}
    </ThemeContext.Provider>
  );
}

// 3. Consume it anywhere — no prop drilling!
function DeepChild() {
  const theme = useContext(ThemeContext); // just works!
  return <div className={theme}>Hello</div>;
}

// Without context, you'd need:
// App → Page → Section → Card → DeepChild (prop drilling 😩)`}</Code>
      <Callout type="warn">Don't overuse Context! It's great for global things (theme, auth, language). For local state between 2–3 components, lifting state up is simpler.</Callout>
    </div>
  );
}

// ─── LESSON 7: ROUTING CONCEPTS ───────────────────────────────────────────────
const PAGES = {
  home:     { title: "Home",     icon: "🏠", content: "Welcome to the app! This is the home page." },
  about:    { title: "About",    icon: "👋", content: "This app was built to teach React routing concepts." },
  profile:  { title: "Profile",  icon: "👤", content: "Your profile page. Imagine user data here." },
  settings: { title: "Settings", icon: "⚙️", content: "Configure your preferences." },
};

function Lesson7() {
  const [currentPage, setCurrentPage] = useState("home");
  const [params,      setParams]      = useState({ id: null });
  const [blogId,      setBlogId]      = useState("");
  const page = PAGES[currentPage] || PAGES.home;

  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>
        React Router maps URL paths to components. Here's a simulation of how it works.
      </p>
      <SectionTitle>Simulated Router</SectionTitle>
      <div style={{ background: "#0f1117", borderRadius: 8, padding: "6px 12px", marginBottom: 12, fontSize: 12, color: "#64748b", fontFamily: "monospace" }}>
        http://myapp.com/<span style={{ color: "#6366f1" }}>{currentPage}</span>{params.id ? `/${params.id}` : ""}
      </div>
      <nav style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(PAGES).map(([key, val]) => (
          <button key={key} onClick={() => { setCurrentPage(key); setParams({ id: null }); }} style={{
            background: currentPage === key ? "#6366f122" : "#1a1f2e",
            border: `1px solid ${currentPage === key ? "#6366f1" : "#2d3748"}`,
            color:  currentPage === key ? "#6366f1"  : "#94a3b8",
            borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer"
          }}>{val.icon} {val.title}</button>
        ))}
      </nav>
      <Card>
        <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 6 }}>
          Rendered component: <code style={{color:"#7dd3fc"}}>{`<${page.title}Page />`}</code>
        </div>
        <h4 style={{ color: "#f1f5f9", margin: "0 0 6px" }}>{page.icon} {page.title}</h4>
        <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>{page.content}</p>
      </Card>
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>
          Simulate a dynamic route: <code style={{color:"#7dd3fc"}}>/blog/:id</code>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={blogId} onChange={e => setBlogId(e.target.value)} placeholder="Enter blog ID (e.g. 42)"
            style={{ flex: 1, background: "#0f1117", color: "#e2e8f0", border: "1px solid #2d3748", borderRadius: 8, padding: "7px 12px", fontSize: 13 }} />
          <Button label="Go" variant="success" onClick={() => { setCurrentPage("home"); setParams({ id: blogId || "42" }); setBlogId(""); }} />
        </div>
        {params.id && (
          <div style={{ marginTop: 8, fontSize: 13, color: "#22c55e" }}>
            → URL is <code style={{color:"#7dd3fc"}}>/blog/{params.id}</code> — component gets <code style={{color:"#7dd3fc"}}>params.id = "{params.id}"</code>
          </div>
        )}
      </div>
      <SectionTitle>Code</SectionTitle>
      <Code>{`// Install: npm install react-router-dom

import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      {/* Route definitions */}
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/blog/:id" element={<BlogPost />} />   {/* dynamic! */}
        <Route path="*"         element={<NotFound />} />   {/* 404 */}
      </Routes>
    </BrowserRouter>
  );
}

// Dynamic route — access the :id from the URL
function BlogPost() {
  const { id } = useParams(); // e.g. "/blog/42" → id = "42"
  return <h1>Blog post #{id}</h1>;
}`}</Code>
    </div>
  );
}

// ─── LESSON 8: ASYNC DATA FETCHING ───────────────────────────────────────────
function Lesson8() {
  const [state, setState] = useState({ data: null, loading: false, error: null });

  const fetchUser = async (id) => {
    setState({ data: null, loading: true, error: null });
    try {
      await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
      if (Math.random() < 0.2) throw new Error("Network error — try again!");
      const mock = [
        { id: 1, name: "Leanne Graham",    email: "Sincere@april.biz",  company: "Romaguera-Crona",     city: "Gwenborough"  },
        { id: 2, name: "Ervin Howell",     email: "Shanna@melissa.tv",  company: "Deckow-Crist",        city: "Wisokyburgh"  },
        { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net", company: "Romaguera-Jacobson",  city: "McKenziehaven" },
      ];
      setState({ data: mock[id - 1] || mock[0], loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: err.message });
    }
  };

  useEffect(() => { fetchUser(1); }, []);

  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>
        Fetch data on mount with <code style={{color:"#7dd3fc"}}>useEffect</code>. Always handle loading, success, and error states.
      </p>
      <SectionTitle>Live Demo</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        {[1, 2, 3].map(id => (
          <Button key={id} label={`Load User ${id}`} variant="primary" onClick={() => fetchUser(id)} />
        ))}
      </div>

      {state.loading && (
        <Card>
          <div style={{ color: "#f59e0b", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 14, height: 14, border: "2px solid #f59e0b33", borderTopColor: "#f59e0b", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            Fetching user data...
          </div>
        </Card>
      )}
      {state.error && (
        <Card style={{ borderColor: "#ef444444" }}>
          <div style={{ color: "#ef4444", fontSize: 13 }}>❌ {state.error}</div>
          <div style={{ marginTop: 8 }}><Button label="Retry" variant="danger" onClick={() => fetchUser(1)} /></div>
        </Card>
      )}
      {state.data && (
        <Card style={{ borderColor: "#22c55e44" }}>
          <div style={{ fontSize: 12, color: "#22c55e", marginBottom: 8 }}>✅ Data loaded</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#f1f5f9" }}>{state.data.name}</div>
          <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>📧 {state.data.email}</div>
          <div style={{ fontSize: 13, color: "#94a3b8" }}>🏢 {state.data.company} · 📍 {state.data.city}</div>
        </Card>
      )}

      <SectionTitle>Code</SectionTitle>
      <Code>{`function UserProfile({ userId }) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        const res  = await fetch(\`/api/users/\${userId}\`);
        if (!res.ok) throw new Error("Request failed");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // re-runs whenever userId changes

  if (loading) return <Spinner />;
  if (error)   return <Error message={error} />;
  if (!data)   return null;
  return <div>{data.name}</div>;
}`}</Code>
      <Callout type="warn">The (20% chance error) above simulates real network failures. Always code defensively!</Callout>
    </div>
  );
}

// ─── LESSON 9: CUSTOM HOOKS ───────────────────────────────────────────────────
function useLocalStorage(key, defaultVal) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : defaultVal; }
    catch { return defaultVal; }
  });
  const set = useCallback((v) => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key]);
  return [val, set];
}

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return size;
}

function Lesson9() {
  const [name,   setName]   = useLocalStorage("student_name", "");
  const [search, setSearch] = useState("");
  const debounced           = useDebounce(search, 400);
  const { w, h }            = useWindowSize();

  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>
        Custom hooks extract reusable stateful logic into functions that start with <code style={{color:"#7dd3fc"}}>use</code>.
      </p>
      <SectionTitle>Hook 1: useLocalStorage</SectionTitle>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (persists on reload!)"
          style={{ flex: 1, background: "#0f1117", color: "#e2e8f0", border: "1px solid #2d3748", borderRadius: 8, padding: "7px 12px", fontSize: 13 }} />
        <Button label="Clear" variant="ghost" onClick={() => setName("")} />
      </div>
      {name && <div style={{ fontSize: 12, color: "#22c55e", marginTop: 5 }}>💾 Saved to localStorage: "{name}"</div>}

      <SectionTitle>Hook 2: useDebounce</SectionTitle>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Type to search (debounced 400ms)..."
        style={{ width: "100%", boxSizing: "border-box", background: "#0f1117", color: "#e2e8f0", border: "1px solid #2d3748", borderRadius: 8, padding: "7px 12px", fontSize: 13 }} />
      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 5 }}>
        Raw: <span style={{ color: "#e2e8f0" }}>"{search}"</span> → Debounced (API would get): <span style={{ color: "#6366f1" }}>"{debounced}"</span>
      </div>

      <SectionTitle>Hook 3: useWindowSize</SectionTitle>
      <div style={{ background: "#0f1117", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#94a3b8" }}>
        Window: <span style={{ color: "#f59e0b", fontWeight: 700 }}>{w} × {h}px</span> — resize the window to see it update live!
      </div>

      <SectionTitle>Code</SectionTitle>
      <Code>{`// Custom hooks = extracting logic that uses built-in hooks
// Rules: must start with "use", can use other hooks inside

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cleanup!
  }, [value, delay]);

  return debounced;
}

// Use it in any component — no code duplication!
function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  // This effect only fires 400ms after typing stops
  useEffect(() => {
    if (debouncedQuery) fetchSearchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input onChange={e => setQuery(e.target.value)} />;
}`}</Code>
    </div>
  );
}

// ─── LESSON 10: PROJECT STRUCTURE ─────────────────────────────────────────────
const TREE = [
  { indent: 0, name: "my-react-app/",   type: "dir"  },
  { indent: 1, name: "public/",         type: "dir"  },
  { indent: 2, name: "index.html",      type: "file", note: "entry HTML" },
  { indent: 1, name: "src/",            type: "dir"  },
  { indent: 2, name: "components/",     type: "dir",  note: "reusable UI pieces" },
  { indent: 3, name: "Button.jsx",      type: "file" },
  { indent: 3, name: "Card.jsx",        type: "file" },
  { indent: 3, name: "Navbar.jsx",      type: "file" },
  { indent: 2, name: "pages/",          type: "dir",  note: "one file per route" },
  { indent: 3, name: "HomePage.jsx",    type: "file" },
  { indent: 3, name: "ProfilePage.jsx", type: "file" },
  { indent: 2, name: "hooks/",          type: "dir",  note: "custom hooks" },
  { indent: 3, name: "useAuth.js",      type: "file" },
  { indent: 3, name: "useFetch.js",     type: "file" },
  { indent: 2, name: "context/",        type: "dir",  note: "Context providers" },
  { indent: 3, name: "AuthContext.jsx",  type: "file" },
  { indent: 3, name: "ThemeContext.jsx", type: "file" },
  { indent: 2, name: "services/",       type: "dir",  note: "API calls" },
  { indent: 3, name: "api.js",          type: "file" },
  { indent: 3, name: "userService.js",  type: "file" },
  { indent: 2, name: "utils/",          type: "dir",  note: "helper functions" },
  { indent: 3, name: "formatDate.js",   type: "file" },
  { indent: 2, name: "App.jsx",         type: "file", note: "root component" },
  { indent: 2, name: "main.jsx",        type: "file", note: "entry point" },
  { indent: 1, name: "package.json",    type: "file" },
];

const FOLDER_DETAILS = {
  "components/":     "Reusable UI components. Each file = one component. Button, Card, Modal, etc.",
  "pages/":          "One component per route. HomePage maps to '/', ProfilePage to '/profile'.",
  "hooks/":          "Custom hooks. useAuth() for authentication, useFetch() for data loading.",
  "context/":        "Context providers. Wrap your app in these to share global state.",
  "services/":       "All fetch/axios calls live here. Keeps API logic out of components.",
  "utils/":          "Pure functions: formatDate, calculateTax, etc. No React here.",
  "App.jsx":         "The root. Sets up Router, wraps with Providers, defines top-level routes.",
  "main.jsx":        "Entry point. ReactDOM.createRoot(). Only file that touches the DOM.",
};

function Lesson10() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>
        A consistent folder structure makes projects navigable and scalable. Click folders to learn what goes where.
      </p>
      <SectionTitle>Standard Structure</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "#0f1117", borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 12 }}>
          {TREE.map((item, i) => (
            <div
              key={i}
              onClick={() => FOLDER_DETAILS[item.name] ? setSelected(item.name) : null}
              style={{
                paddingLeft: item.indent * 14, display: "flex", alignItems: "center", gap: 5,
                color: item.type === "dir" ? "#f59e0b" : "#94a3b8", lineHeight: "22px",
                cursor: FOLDER_DETAILS[item.name] ? "pointer" : "default",
                background: selected === item.name ? "#f59e0b11" : "transparent",
                borderRadius: 4
              }}
            >
              <span>{item.type === "dir" ? "📁" : "📄"}</span>
              <span style={{ color: selected === item.name ? "#f59e0b" : undefined }}>{item.name}</span>
              {item.note && <span style={{ color: "#475569", fontSize: 10 }}>← {item.note}</span>}
            </div>
          ))}
        </div>
        <div>
          {selected ? (
            <Card style={{ borderColor: "#f59e0b44" }}>
              <div style={{ fontWeight: 700, color: "#f59e0b", fontSize: 14, marginBottom: 8 }}>📁 {selected}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{FOLDER_DETAILS[selected]}</div>
            </Card>
          ) : (
            <div style={{ color: "#475569", fontSize: 13, padding: 14 }}>← Click a folder or file to learn what it contains</div>
          )}
          <Callout type="info">
            This structure isn't enforced by React — it's a community best practice. Small projects can start with everything in{" "}
            <code style={{color:"#7dd3fc"}}>src/</code> and organize later.
          </Callout>
        </div>
      </div>
      <SectionTitle>Code</SectionTitle>
      <Code>{`// main.jsx — entry point
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// App.jsx — root component with routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <AuthProvider>           {/* global context */}
      <BrowserRouter>        {/* routing */}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}`}</Code>
    </div>
  );
}

// ─── LESSON 11: STATE FLOW THINKING ──────────────────────────────────────────
function Lesson11() {
  const [cart,         setCart]         = useState([]);
  const [notification, setNotification] = useState(null);

  const products = [
    { id: 1, name: "React Handbook", price: 29, emoji: "📘" },
    { id: 2, name: "JS Mastery",     price: 19, emoji: "📗" },
    { id: 3, name: "CSS Deep Dive",  price: 24, emoji: "📕" },
  ];

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setNotification(`Added "${product.name}"`);
    setTimeout(() => setNotification(null), 2000);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>
        Think before coding: <em>Who owns this state? Who reads it? Who changes it?</em> That determines where state lives.
      </p>
      <SectionTitle>Live Demo — Mini Shop</SectionTitle>

      {notification && (
        <div style={{ background: "#22c55e22", border: "1px solid #22c55e44", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#22c55e", marginBottom: 10 }}>
          ✅ {notification}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>PRODUCTS</div>
          {products.map(p => (
            <Card key={p.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 14, color: "#e2e8f0" }}>{p.emoji} {p.name}</div>
                  <div style={{ fontSize: 13, color: "#6366f1", fontWeight: 700 }}>${p.price}</div>
                </div>
                <Button label="Add" variant="primary" size="sm" onClick={() => addToCart(p)} />
              </div>
            </Card>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>
            CART ({cart.reduce((s, i) => s + i.qty, 0)} items)
          </div>
          {cart.length === 0 && <div style={{ color: "#475569", fontSize: 13, padding: 12 }}>Empty cart</div>}
          {cart.map(item => (
            <Card key={item.id} style={{ padding: "8px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>×{item.qty}</span>
                <span style={{ flex: 1, fontSize: 13, color: "#e2e8f0" }}>{item.name}</span>
                <span style={{ fontSize: 13, color: "#6366f1", fontWeight: 700 }}>${item.price * item.qty}</span>
                <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#ef444488", cursor: "pointer" }}>✕</button>
              </div>
            </Card>
          ))}
          {cart.length > 0 && (
            <div style={{ borderTop: "1px solid #2d3748", marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#94a3b8", fontSize: 13 }}>Total</span>
              <span style={{ color: "#22c55e", fontWeight: 700 }}>${total}</span>
            </div>
          )}
        </div>
      </div>

      <SectionTitle>State Map</SectionTitle>
      <Code>{`// THINK: map your state before writing code

// State          Owner       Consumers
// ─────────────────────────────────────────
// cart []        App         ProductList, CartPanel, Badge
// notification   App         NotificationBar
// (products)     static      ProductList (no state needed!)

// RULES OF THUMB:
// 1. State belongs in its lowest common ancestor
// 2. Derived values are NOT state — compute them
//    ✅ const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
//    ❌ const [total, setTotal] = useState(0) — this gets out of sync!

// 3. Ask: does this reset on page reload? → localStorage/server
//    Does this reset on navigation? → component state is fine

// 4. Events travel UP (callbacks), data flows DOWN (props)`}</Code>
      <Callout type="success">Mental model: draw a box for each component. Draw arrows for data (down) and events (up). If arrows get tangled → lift state or use Context.</Callout>
    </div>
  );
}

// ─── LESSONS REGISTRY ─────────────────────────────────────────────────────────
const LESSONS = [Lesson0, Lesson1, Lesson2, Lesson3, Lesson4, Lesson5, Lesson6, Lesson7, Lesson8, Lesson9, Lesson10, Lesson11];

// ─── APP SHELL ────────────────────────────────────────────────────────────────
export default function ReactLesson() {
  const [active,    setActive]    = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const LessonComponent = LESSONS[active];

  const go = (dir) => {
    setCompleted(prev => new Set([...prev, active]));
    setActive(a => Math.max(0, Math.min(TOPICS.length - 1, a + dir)));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080b14", fontFamily: "system-ui, sans-serif", color: "#e2e8f0" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

      {/* Header */}
      <div style={{ background: "#0d111d", borderBottom: "1px solid #1e2535", padding: "14px 24px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 18, color: "#6366f1" }}>⚛️ ReactClass</div>
        <div style={{ flex: 1, height: 4, background: "#1e2535", borderRadius: 99 }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, #6366f1, #22c55e)",
            borderRadius: 99,
            width: `${(completed.size / TOPICS.length) * 100}%`,
            transition: "width .4s"
          }} />
        </div>
        <div style={{ fontSize: 12, color: "#64748b" }}>{completed.size}/{TOPICS.length} done</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "calc(100vh - 57px)" }}>

        {/* Sidebar */}
        <div style={{ background: "#0d111d", borderRight: "1px solid #1e2535", padding: "12px 0", overflowY: "auto" }}>
          {TOPICS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{
              width: "100%", textAlign: "left",
              background: active === t.id ? "#6366f111" : "transparent",
              border: "none",
              borderLeft: `3px solid ${active === t.id ? "#6366f1" : "transparent"}`,
              color: active === t.id ? "#6366f1" : "#64748b",
              padding: "8px 14px", fontSize: 12.5, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
              transition: "all .15s"
            }}>
              <span>{t.emoji}</span>
              <span style={{ flex: 1, lineHeight: 1.3 }}>{t.label}</span>
              {completed.has(t.id) && <span style={{ color: "#22c55e", fontSize: 10 }}>✓</span>}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ overflowY: "auto" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 24 }}>{TOPICS[active].emoji}</span>
              <div>
                <div style={{ fontSize: 11, color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
                  Lesson {active + 1} of {TOPICS.length}
                </div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#f1f5f9" }}>{TOPICS[active].label}</h2>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                <Tag color="#6366f1">Interactive</Tag>
                <Tag color="#22c55e">Live Code</Tag>
              </div>
            </div>

            <LessonComponent />

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 16, borderTop: "1px solid #1e2535" }}>
              <button onClick={() => go(-1)} disabled={active === 0} style={{
                background: "#1a1f2e", border: "1px solid #2d3748",
                color: active === 0 ? "#2d3748" : "#94a3b8",
                borderRadius: 8, padding: "8px 18px", fontSize: 13,
                cursor: active === 0 ? "not-allowed" : "pointer"
              }}>← Previous</button>
              <div style={{ fontSize: 12, color: "#475569", alignSelf: "center" }}>{active + 1} / {TOPICS.length}</div>
              <button onClick={() => go(1)} disabled={active === TOPICS.length - 1} style={{
                background: active === TOPICS.length - 1 ? "#1a1f2e" : "#6366f122",
                border: `1px solid ${active === TOPICS.length - 1 ? "#2d3748" : "#6366f1"}`,
                color:  active === TOPICS.length - 1 ? "#2d3748" : "#6366f1",
                borderRadius: 8, padding: "8px 18px", fontSize: 13,
                cursor: active === TOPICS.length - 1 ? "not-allowed" : "pointer", fontWeight: 600
              }}>Next →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
