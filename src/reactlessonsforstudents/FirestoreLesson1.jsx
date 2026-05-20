import { useState } from "react";

const steps = [
  {
    tab: "1. Setup",
    badge: "Step 1 — Setup Firebase",
    title: "Create a Firebase project and install the SDK",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          First, go to{" "}
          <span className="text-orange-400 font-medium">firebase.google.com</span>,
          create a new project, then add a Web app to it. Firebase will give you
          a config object. Save it!
        </p>
        <p className="text-sm text-slate-400 leading-relaxed">
          Then install Firebase in your React project:
        </p>
        <CodeBlock code={`# In your terminal, inside your React project folder\nnpm install firebase`} />
        <p className="text-sm text-slate-400 leading-relaxed">
          Create a new file{" "}
          <code className="bg-slate-700 text-orange-300 px-1.5 py-0.5 rounded text-xs font-mono">
            src/firebase.js
          </code>{" "}
          — this is where you connect to Firebase:
        </p>
        <CodeBlock
          code={`// src/firebase.js
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

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)`}
        />
        <TipBox text={<>The <code className="bg-teal-900/60 text-teal-300 px-1 rounded font-mono text-xs">db</code> variable is your Firestore database. You'll import it wherever you need to read or write data.</>} />
      </div>
    ),
  },
  {
    tab: "2. Connect",
    badge: "Step 2 — Understand Firestore structure",
    title: "Collections and documents",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          Firestore stores data as{" "}
          <span className="text-orange-400 font-medium">documents</span> inside{" "}
          <span className="text-orange-400 font-medium">collections</span>. Think
          of a collection like a folder, and a document like a file inside it.
        </p>
        <CodeBlock
          code={`// Structure example
students/          ← collection
  abc123/          ← document (auto ID)
    name: "Ana"
    grade: 10
    email: "ana@school.com"
  def456/
    name: "Leo"
    grade: 11`}
        />
        <p className="text-sm text-slate-400 leading-relaxed">
          You can have as many collections as you need — for example{" "}
          <code className="bg-slate-700 text-orange-300 px-1.5 py-0.5 rounded text-xs font-mono">students</code>,{" "}
          <code className="bg-slate-700 text-orange-300 px-1.5 py-0.5 rounded text-xs font-mono">assignments</code>,{" "}
          <code className="bg-slate-700 text-orange-300 px-1.5 py-0.5 rounded text-xs font-mono">grades</code>, etc.
        </p>
        <WarnBox text="Firestore is NoSQL — there are no tables, no SQL. Data is flexible JSON-like objects." />
      </div>
    ),
  },
  {
    tab: "3. Write data",
    badge: "Step 3 — Write data to Firestore",
    title: "Add a document to a collection",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          Use{" "}
          <code className="bg-slate-700 text-orange-300 px-1.5 py-0.5 rounded text-xs font-mono">addDoc</code>{" "}
          to save a new document with an auto-generated ID, or{" "}
          <code className="bg-slate-700 text-orange-300 px-1.5 py-0.5 rounded text-xs font-mono">setDoc</code>{" "}
          to set a specific ID.
        </p>
        <CodeBlock
          code={`// AddStudent.jsx
import { db } from "./firebase"
import { collection, addDoc } from "firebase/firestore"
import { useState } from "react"

export default function AddStudent() {
  const [name, setName] = useState("")

  const handleAdd = async () => {
    await addDoc(collection(db, "students"), {
      name: name,
      createdAt: new Date()
    })
    setName("") // clear input after saving
    alert("Student saved!")
  }

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleAdd}>Add Student</button>
    </div>
  )
}`}
        />
        <TipBox text={<><code className="bg-teal-900/60 text-teal-300 px-1 rounded font-mono text-xs">addDoc</code> is <strong>async</strong> — always use <code className="bg-teal-900/60 text-teal-300 px-1 rounded font-mono text-xs">await</code> with it and wrap in a <code className="bg-teal-900/60 text-teal-300 px-1 rounded font-mono text-xs">try/catch</code> for error handling.</>} />
      </div>
    ),
  },
  {
    tab: "4. Read data",
    badge: "Step 4 — Read data from Firestore",
    title: "Fetch all students and display them",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">
          Use{" "}
          <code className="bg-slate-700 text-orange-300 px-1.5 py-0.5 rounded text-xs font-mono">getDocs</code>{" "}
          to read all documents in a collection once, or{" "}
          <code className="bg-slate-700 text-orange-300 px-1.5 py-0.5 rounded text-xs font-mono">onSnapshot</code>{" "}
          to listen for real-time updates.
        </p>
        <CodeBlock
          code={`// StudentList.jsx
import { db } from "./firebase"
import { collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"

export default function StudentList() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "students"))
      const list = snapshot.docs.map(doc => ({
        id: doc.id,        // the auto-generated ID
        ...doc.data()      // name, createdAt, etc.
      }))
      setStudents(list)
    }
    fetchStudents()
  }, [])

  return (
    <ul>
      {students.map(s => (
        <li key={s.id}>{s.name}</li>
      ))}
    </ul>
  )
}`}
        />
        <TipBox text={<><code className="bg-teal-900/60 text-teal-300 px-1 rounded font-mono text-xs">doc.data()</code> returns the fields you saved. <code className="bg-teal-900/60 text-teal-300 px-1 rounded font-mono text-xs">doc.id</code> is the unique Firestore ID — always use it as the React <code className="bg-teal-900/60 text-teal-300 px-1 rounded font-mono text-xs">key</code>.</>} />
      </div>
    ),
  },
];

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = code
    .replace(/\/\/.*/g, (m) => `<span class="text-slate-500 italic">${m}</span>`)
    .replace(
      /\b(import|export|const|default|function|return|async|await|new|from)\b/g,
      '<span class="text-violet-400">$1</span>'
    )
    .replace(/"([^"]+)"/g, '<span class="text-emerald-400">"$1"</span>')
    .replace(/←.*$/gm, (m) => `<span class="text-slate-500 italic">${m}</span>`);

  return (
    <div className="relative group rounded-xl bg-slate-900 border border-slate-700/60 overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-700/60 bg-slate-800/50">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
      </div>
      <div className="overflow-x-auto p-4">
        <pre
          className="font-mono text-xs leading-relaxed text-slate-300"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs px-2.5 py-1 rounded-md flex items-center gap-1"
      >
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

export default function FirestoreLesson() {
  const [current, setCurrent] = useState(0);
  const total = steps.length;

  return (
    <div className="min-h-screen bg-slate-950 flex items-start justify-center p-6 font-sans">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            🔥 Lesson 1 of 3
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">
            Firebase Firestore + React
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Learn to connect your React app to Firestore and store data step by step.
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/40">

          {/* Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/80 overflow-x-auto">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  current === i
                    ? "text-orange-400 border-orange-500 bg-slate-800/60"
                    : "text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-800/30"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>

          {/* Step content */}
          <div className="p-6">
            <div className="inline-block text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-4">
              {steps[current].badge}
            </div>
            <h2 className="text-base font-medium text-white mb-5">
              {steps[current].title}
            </h2>
            {steps[current].content}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/60">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors bg-slate-800 hover:bg-slate-700 disabled:hover:bg-slate-800 px-3.5 py-2 rounded-lg border border-slate-700"
            >
              ← Previous
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-200 ${
                    current === i
                      ? "w-5 h-2 bg-orange-500"
                      : "w-2 h-2 bg-slate-600 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
              disabled={current === total - 1}
              className="flex items-center gap-2 text-xs font-medium text-white disabled:opacity-25 disabled:cursor-not-allowed transition-opacity bg-orange-500 hover:bg-orange-400 disabled:hover:bg-orange-500 px-3.5 py-2 rounded-lg"
            >
              {current === total - 1 ? "Done ✓" : "Next →"}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>
        <p className="text-center text-xs text-slate-600 mt-2">
          {current + 1} / {total} steps
        </p>
      </div>
    </div>
  );
}
