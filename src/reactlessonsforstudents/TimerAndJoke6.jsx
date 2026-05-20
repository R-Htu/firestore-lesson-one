
import { useState, useEffect } from "react";

function TimerAndJoke6() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [joke, setJoke] = useState(null);
  // BONUS: const [jokeTrigger, setJokeTrigger] = useState(0);

  // Effect 1: Update the browser tab title
  useEffect(() => {
    document.title = `Timer: ${seconds}s`;
  }, [seconds]);

  // Effect 2: YOUR CODE HERE — start the timer interval ↓
  useEffect(() => {
    // hint: const id = setInterval(() => { ... }, 1000);
    // hint: return () => clearInterval(id);
  }, [isRunning, seconds]);

  // Effect 3: YOUR CODE HERE — fetch a random joke ↓
  useEffect(() => {
    // hint: fetch("https://official-joke-api.appspot.com/random_joke")
    //   .then(res => res.json())
    //   .then(data => setJoke(data));
  }, [/* BONUS: jokeTrigger */]);

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>⏱️ Timer</h1>
      <p style={{ fontSize: "72px", fontWeight: "bold" }}>{seconds}s</p>

      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "32px" }}>
        {/* YOUR CODE HERE: Pause/Resume button ↓ */}
        <button style={{ padding: "10px 20px" }}>Pause / Resume</button>

        <button onClick={() => setSeconds(0)} style={{ padding: "10px 20px" }}>
          🔄 Reset
        </button>
      </div>

      <hr />

      <h2> Random Joke</h2>
      {/* YOUR CODE HERE: show joke setup and punchline, or a loading message ↓ */}
      {joke ? (
        <div>
          <p><strong>{joke.setup}</strong></p>
          <p>{joke.punchline}</p>
        </div>
      ) : (
        <p>Loading joke...</p>
      )}

      {/* BONUS: New Joke button ↓ */}

    </div>
  );
}

export default TimerAndJoke6;
