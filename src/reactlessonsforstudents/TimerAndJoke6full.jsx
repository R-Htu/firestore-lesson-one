import { useState, useEffect } from "react";

function TimerAndJoke6full() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [joke, setJoke] = useState(null);
  const [jokeTrigger, setJokeTrigger] = useState(0);

  // Effect 1: Update the browser tab title
  useEffect(() => {
    document.title = `Timer: ${seconds}s`;
  }, [seconds]);

  // Effect 2: Timer interval
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  // Effect 3: Fetch a random joke
  useEffect(() => {
    setJoke(null);
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((res) => res.json())
      .then((data) => setJoke(data))
      .catch(() =>
        setJoke({
          setup: "Why did the fetch fail?",
          punchline: "Bad connection! 😅",
        })
      );
  }, [jokeTrigger]);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h1>⏱️ Timer</h1>

      <p style={{ fontSize: "72px", fontWeight: "bold", margin: "0" }}>
        {seconds}s
      </p>

      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          marginBottom: "32px",
          marginTop: "16px",
        }}
      >
        {/* Pause / Resume button */}
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
            background: isRunning ? "#fef2f2" : "#f0fdf4",
            color: isRunning ? "#dc2626" : "#16a34a",
            fontWeight: "600",
          }}
        >
          {isRunning ? "⏸ Pause" : "▶️ Resume"}
        </button>

        <button
          onClick={() => {
            setSeconds(0);
            setIsRunning(true);
          }}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
            fontWeight: "600",
          }}
        >
          🔄 Reset
        </button>
      </div>

      <hr />

      <h2 style={{ marginTop: "24px" }}>😂 Random Joke</h2>

      <div
        style={{
          minHeight: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "16px 0",
          padding: "16px",
          background: "#f8fafc",
          borderRadius: "10px",
          border: "1px solid #e2e8f0",
        }}
      >
        {joke ? (
          <>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>{joke.setup}</p>
            <p style={{ marginTop: "10px", color: "#64748b" }}>
              {joke.punchline}
            </p>
          </>
        ) : (
          <p style={{ color: "#94a3b8" }}>Loading joke...</p>
        )}
      </div>

      {/* New Joke button */}
      <button
        onClick={() => setJokeTrigger((prev) => prev + 1)}
        style={{
          padding: "10px 24px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
          background: "#0f172a",
          color: "white",
          fontWeight: "600",
          fontSize: "14px",
        }}
      >
        🎲 New Joke
      </button>
    </div>
  );
}

export default TimerAndJoke6full;