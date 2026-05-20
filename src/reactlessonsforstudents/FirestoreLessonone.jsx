import { useState } from "react";

// ─── Syntax highlighter using React elements (no dangerouslySetInnerHTML) ───
function highlight(line, i) {
  const parts = [];
  let rest = line;
  let key = 0;

  const consume = (text, className) => {
    parts.push(
      className
        ? <span key={key++} className={className}>{text}</span>
        : <span key={key++}>{text}</span>
    );
  };

  // Comment: everything from // to end of line
  const commentIdx = rest.indexOf("//");
  if (commentIdx !== -1) {
    const before = rest.slice(0, commentIdx);
    const comment = rest.slice(commentIdx);
    rest = before;
    // process the before part, then append comment
    tokenize(before, parts, key);
    parts.push(<span key="comment" className="text-slate-500 italic">{comment}</span>);
    return <div key={i} className="leading-relaxed">{parts}</div>;
  }

  tokenize(rest, parts, key);
  return <div key={i} className="leading-relaxed">{parts}</div>;
}

function tokenize(text, parts, startKey) {
  const keywords = /\b(import|export|const|let|default|function|return|async|await|new|from|if|try|catch|throw)\b/g;
  const strings = /"([^"]*)"/g;
  let key = startKey;
  let last = 0;

  // Merge all tokens sorted by index
  const tokens = [];
  let m;
  const kCopy = new RegExp(keywords.source, "g");
  const sCopy = new RegExp(strings.source, "g");

  while ((m = kCopy.exec(text)) !== null)
    tokens.push({ start: m.index, end: m.index + m[0].length, text: m[0], cls: "text-violet-400" });
  while ((m = sCopy.exec(text)) !== null)
    tokens.push({ start: m.index, end: m.index + m[0].length, text: m[0], cls: "text-emerald-400" });

  tokens.sort((a, b) => a.start - b.start);

  // Remove overlapping tokens
  const clean = [];
  let cursor = 0;
  for (const t of tokens) {
    if (t.start >= cursor) { clean.push(t); cursor = t.end; }
  }

  for (const t of clean) {
    if (t.start > last) parts.push(<span key={key++}>{text.slice(last, t.start)}</span>);
    parts.push(<span key={key++} className={t.cls}>{t.text}</span>);
    last = t.end;
  }
  if (last < text.length) parts.push(<span key={key++}>{text.slice(last)}</span>);
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const lines = code.split("\n");
  return (
    <div className="relative group rounded-xl bg-slate-900 border border-slate-700/60 overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-700/60 bg-slate-800/50">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-xs text-slate-300 whitespace-pre">
          {lines.map((line, i) => highlight(line, i))}
        </pre>
      </div>
      <button onClick={handleCopy}
        className="absolute top-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs px-2.5 py-1 rounded-md">
        {copied ? "✓ copied" : "copy"}
      </button>
    </div>
  );
}

function TipBox({ text }) {
  return (
    <div className="flex gap-3 bg-teal-950/50 border border-teal-800/50 rounded-xl p-3.5">
      <span className="text-teal-400 text-base mt-0.5 shrink-0">💡</span>
      <p className="text-xs text-teal-300 leading-relaxed">{text}</p>
    </div>
  );
}

function WarnBox({ text }) {
  return (
    <div className="flex gap-3 bg-amber-950/40 border border-amber-800/40 rounded-xl p-3.5">
      <span className="text-amber-400 text-base mt-0.5 shrink-0">⚠️</span>
      <p className="text-xs text-amber-300 leading-relaxed">{text}</p>
    </div>
  );
}

function C({ children }) {
  return <code className="bg-slate-700 text-orange-300 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>;
}
function TC({ children }) {
  return <code className="bg-teal-900/60 text-teal-300 px-1 rounded font-mono text-xs">{children}</code>;
}

const steps = [
  {
    tab: "1. Setup",
    badge: "Step 1 — Setup Firebase",
    title: "Create a Firebase project and install the SDK",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          Go to <span className="text-orange-400 font-medium">firebase.google.com</span>, sign in,
          click <strong className="text-slate-300">Add project</strong> and follow the steps.
          Then click the <strong className="text-slate-300">Web icon</strong> (<C>&lt;/&gt;</C>) to
          register your app. Firebase gives you a config object — copy it, you'll need it soon.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed">Install Firebase in your React project:</p>
        <CodeBlock code={`# Run this in your terminal, inside your React project folder
npm install firebase`} />
        <p className="text-sm text-slate-400 leading-relaxed">
          Create <C>src/firebase.js</C>. This file connects your app to Firebase and exports
          the database so other files can use it.
        </p>
        <CodeBlock code={`// src/firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Paste YOUR config from the Firebase console here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}

// Connect to Firebase
const app = initializeApp(firebaseConfig)

// Connect to Firestore and export it
export const db = getFirestore(app)`} />
        <TipBox text={<>The <TC>db</TC> variable is your live database connection. Import it in any component that reads or writes data.</>} />
      </div>
    ),
  },
  {
    tab: "2. Structure",
    badge: "Step 2 — Understand Firestore structure",
    title: "Collections and documents — how Firestore organises data",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          Firestore is <span className="text-orange-400 font-medium">NoSQL</span> — no tables, no rows.
          Data lives in <span className="text-orange-400 font-medium">collections</span> (folders) that
          contain <span className="text-orange-400 font-medium">documents</span> (files). Each document
          holds key-value data like a JavaScript object.
        </p>
        <CodeBlock code={`// How data is structured in Firestore
students/                  // a collection (like a folder)
  abc123/                  // a document (auto-generated ID)
    name: "Ana"            // fields inside the document
    grade: 10
    email: "ana@school.com"
  def456/
    name: "Leo"
    grade: 11`} />
        <p className="text-sm text-slate-400 leading-relaxed">
          You can have as many collections as you need — e.g. <C>students</C>, <C>assignments</C>, <C>grades</C>.
          Documents in the same collection don't need to have the same fields — Firestore is flexible.
        </p>
        <WarnBox text="There are no SQL queries, no JOIN, no schema. If you know MySQL this feels different at first — but it's very simple once you get used to it." />
      </div>
    ),
  },
  {
    tab: "3. Write",
    badge: "Step 3 — Write data to Firestore",
    title: "Save a student document to the database",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          Use <C>addDoc</C> to save data. Pass the collection reference (where to save)
          and an object (what to save). Firestore automatically generates a unique ID for each document.
        </p>
        <CodeBlock code={`// AddStudent.jsx
import { db } from "./firebase"
import { collection, addDoc } from "firebase/firestore"
import { useState } from "react"

export default function AddStudent() {
  const [name, setName] = useState("")

  const handleAdd = async () => {
    // collection(db, "students") = inside db, use the "students" collection
    // If "students" does not exist yet, Firestore creates it automatically
    await addDoc(collection(db, "students"), {
      name: name,
      createdAt: new Date()   // good practice: save when the record was created
    })

    setName("")   // clear the input after saving
    alert("Student saved!")
  }

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleAdd}>Add Student</button>
    </div>
  )
}`} />
        <TipBox text={<><TC>addDoc</TC> is async — always use <TC>await</TC> so your code waits for the save to finish. In step 6 you will learn to wrap it in <TC>try/catch</TC> to handle errors.</>} />
      </div>
    ),
  },
  {
    tab: "4. Read",
    badge: "Step 4 — Read data from Firestore",
    title: "Fetch all students and display them",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          Use <C>getDocs</C> to fetch all documents in a collection as a snapshot.
          Loop over <C>snapshot.docs</C> to build a plain array React can render.
          Do this inside <C>useEffect</C> so it runs once when the component loads.
        </p>
        <CodeBlock code={`// StudentList.jsx
import { db } from "./firebase"
import { collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"

export default function StudentList() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      // Get all documents from the "students" collection
      const snapshot = await getDocs(collection(db, "students"))

      // doc.id       = the auto-generated Firestore ID (e.g. "abc123")
      // doc.data()   = the actual fields { name: "Ana", grade: 10 }
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()   // spread all fields into the object
      }))

      setStudents(list)
    }

    fetchStudents()
  }, []) // empty [] = run once when component mounts

  return (
    <ul>
      {students.map(s => (
        <li key={s.id}>{s.name}</li>   // always use doc.id as the React key
      ))}
    </ul>
  )
}`} />
        <TipBox text={<>The <TC>...doc.data()</TC> spread copies all fields into the object. Combined with <TC>id: doc.id</TC> you get one clean object per student.</>} />
      </div>
    ),
  },
  {
    tab: "5. Loading",
    badge: "Step 5 — Loading state",
    title: "Show a message while fetching data",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          Fetching from Firestore takes a moment. Without a loading state your page
          shows an empty list before data arrives — which looks broken. Add a <C>loading</C> state
          and show a message while waiting.
        </p>
        <CodeBlock code={`import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "./firebase"

export default function StudentList() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)  // true = we are loading

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "students"))

      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setStudents(list)
      setLoading(false)  // done loading — flip to false
    }

    fetchStudents()
  }, [])

  if (loading) {
    return <p>Loading students...</p>  // shown while waiting
  }

  return (
    <ul>
      {students.map(student => (
        <li key={student.id}>{student.name}</li>
      ))}
    </ul>
  )
}`} />
        <TipBox text="This pattern (loading → fetch → done) is standard for async data in React. You will use it in almost every component that talks to a database." />
      </div>
    ),
  },
  {
    tab: "6. Errors",
    badge: "Step 6 — Handle errors",
    title: "Protect your app with try/catch",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          Firebase requests can fail — no internet, wrong permissions, bad config.
          Without error handling your app crashes silently. Wrap every async Firebase
          call in <C>try/catch</C> to show a helpful message instead.
        </p>
        <CodeBlock code={`const handleAdd = async () => {
  try {
    // Everything here runs if it works fine
    await addDoc(collection(db, "students"), {
      name: name,
      createdAt: new Date()
    })

    alert("Student saved!")
    setName("")

  } catch (error) {
    // If anything in "try" throws, we land here
    // Always log the error so you can debug it
    console.error("Firestore error:", error)
    alert("Something went wrong. Please try again.")
  }
}`} />
        <WarnBox text="Never assume a network request will succeed. On mobile especially, users lose connection often. try/catch is not optional — make it a habit." />
        <TipBox text={<>The error object has <TC>error.message</TC> and <TC>error.code</TC>. For example <TC>permission-denied</TC> means Firestore security rules are blocking the write. Check the browser console to see what went wrong.</>} />
      </div>
    ),
  },
  {
    tab: "7. Live Data",
    badge: "Step 7 — Real-time updates",
    title: "Listen for changes with onSnapshot",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          <C>getDocs</C> fetches data once. <C>onSnapshot</C> sets up a live listener —
          whenever any document changes (added, edited, deleted) Firestore pushes the update
          to your component automatically. Perfect for collaborative apps or live class lists.
        </p>
        <CodeBlock code={`import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "./firebase"

export default function StudentList() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    // onSnapshot returns an "unsubscribe" function
    const unsubscribe = onSnapshot(
      collection(db, "students"),
      (snapshot) => {
        // This callback runs every time data changes
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setStudents(list)
      }
    )

    // Cancel the listener when the component unmounts
    // Without this the listener keeps running in the background (memory leak)
    return () => unsubscribe()
  }, [])

  return (
    <ul>
      {students.map(student => (
        <li key={student.id}>{student.name}</li>
      ))}
    </ul>
  )
}`} />
        <TipBox text="The return () => unsubscribe() inside useEffect is a cleanup function. React runs it when the component is removed. Always clean up listeners — skipping this is a very common beginner mistake." />
      </div>
    ),
  },
  {
    tab: "8. Delete",
    badge: "Step 8 — Delete documents",
    title: "Remove a student from Firestore",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          To delete a document you need its ID. Use <C>doc(db, "collection", id)</C> to
          reference the exact document, then pass it to <C>deleteDoc</C>.
          If you are using <C>onSnapshot</C> from step 7, the UI updates automatically after deletion.
        </p>
        <CodeBlock code={`import { db } from "./firebase"
import { doc, deleteDoc } from "firebase/firestore"

// Call this with the student's Firestore document ID
const handleDelete = async (id) => {
  try {
    // doc(db, "students", id) = reference to ONE specific document
    await deleteDoc(doc(db, "students", id))
    alert("Student deleted!")
  } catch (error) {
    console.error("Delete failed:", error)
    alert("Could not delete. Try again.")
  }
}

// In your JSX:
// <button onClick={() => handleDelete(student.id)}>Delete</button>`} />
        <WarnBox text="Deleting is permanent — there is no recycle bin in Firestore. Consider adding window.confirm() before deleting, especially in student-facing apps." />
      </div>
    ),
  },
  {
    tab: "9. Update",
    badge: "Step 9 — Update documents",
    title: "Edit existing data with updateDoc",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          Use <C>updateDoc</C> to change specific fields inside a document.
          Unlike <C>setDoc</C> which replaces the whole document, <C>updateDoc</C> only
          changes the fields you list — everything else stays untouched.
        </p>
        <CodeBlock code={`import { db } from "./firebase"
import { doc, updateDoc } from "firebase/firestore"

// Update just the name of one student
const handleUpdate = async (id, newName) => {
  try {
    const studentRef = doc(db, "students", id)

    // Only "name" is updated — grade, email etc. are NOT touched
    await updateDoc(studentRef, {
      name: newName
    })

    alert("Student updated!")
  } catch (error) {
    console.error("Update failed:", error)
  }
}

// You can update multiple fields at once too:
// await updateDoc(studentRef, {
//   name: newName,
//   grade: 11
// })`} />
        <TipBox text={<>A common pattern: keep an <TC>editingId</TC> state. When a user clicks Edit, store the document ID. When they click Save, call <TC>updateDoc</TC> with that ID. No separate edit page needed.</>} />
      </div>
    ),
  },
];

export default function FirestoreLesson() {
  const [current, setCurrent] = useState(0);
  const total = steps.length;

  return (
    <div className="min-h-screen bg-slate-950 flex items-start justify-center p-6 font-sans">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            🔥 Lesson 1 of 9
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">
            Firebase Firestore + React
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Learn to connect your React app to Firestore and store data — step by step, with explanations.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/40">
          <div className="flex border-b border-slate-800 bg-slate-900/80 overflow-x-auto">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  current === i
                    ? "text-orange-400 border-orange-500 bg-slate-800/60"
                    : "text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-800/30"
                }`}>
                {s.tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            <div className="inline-block text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-4">
              {steps[current].badge}
            </div>
            <h2 className="text-base font-medium text-white mb-5">
              {steps[current].title}
            </h2>
            {steps[current].content}
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/60">
            <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}
              className="text-xs text-slate-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed bg-slate-800 hover:bg-slate-700 disabled:hover:bg-slate-800 px-3.5 py-2 rounded-lg border border-slate-700 transition-colors">
              ← Previous
            </button>
            <div className="flex items-center gap-2">
              {steps.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-200 ${
                    current === i ? "w-5 h-2 bg-orange-500" : "w-2 h-2 bg-slate-600 hover:bg-slate-500"
                  }`} />
              ))}
            </div>
            <button onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))} disabled={current === total - 1}
              className="text-xs font-medium text-white disabled:opacity-25 disabled:cursor-not-allowed bg-orange-500 hover:bg-orange-400 disabled:hover:bg-orange-500 px-3.5 py-2 rounded-lg transition-opacity">
              {current === total - 1 ? "Done ✓" : "Next →"}
            </button>
          </div>
        </div>

        <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / total) * 100}%` }} />
        </div>
        <p className="text-center text-xs text-slate-600 mt-2">{current + 1} / {total} steps</p>
      </div>
    </div>
  );
}
