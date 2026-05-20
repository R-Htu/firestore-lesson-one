/**
 * Lady Midnight Gallery — React App (No Firebase)
 * ─────────────────────────────────────────────────
 * Pure React state auth — no external dependencies beyond React itself.
 * Users are stored in memory (reset on page refresh).
 * To persist users across refreshes, swap mockUsers for localStorage.
 */

import { useState, useEffect } from "react";

// ── GALLERY IMAGES ───────────────────────────────────────────
const IMAGES = [
  {
    img: "https://i.ibb.co/cSFMGNch/IMG-20260419-093406.jpg",
    e: "🎂",
    lbl: "birthday cake",
    quote: "Wishing you a day filled with happiness & laughter. Happy birthday, dear friend!",
    attr: "✨ happy birthday ✨",
  },
  {
    img: "https://i.ibb.co/3y7ZZq9k/kinda-melon.jpg",
    e: "🍈",
    lbl: "kinda melon",
    quote: "Wishing you a lifetime of thinking about me hehe 😄",
    attr: "🎊 celebrate you 🎊",
  },
  {
    img: "https://i.ibb.co/Lz6kshmh/IMG-20260427-WA0025.jpg",
    e: "🎁",
    lbl: "gift box",
    quote: "You are the greatest gift to everyone who knows you.",
    attr: "🎀 you're a gift 🎀",
  },
  {
    img: "https://i.ibb.co/YBp7YBk9/apple-from-cambodia.jpg",
    e: "🍎",
    lbl: "cambodia apple",
    quote: "Friends are the sunshine of life.",
    attr: "— John Hay",
  },
  {
    img: "https://i.ibb.co/FkjPdBCm/chili-for-neighbors.jpg",
    e: "🌶️",
    lbl: "chili for neighbors",
    quote: "A real friend walks in when the rest of the world walks out.",
    attr: "— Walter Winchell",
  },
  {
    img: "https://i.ibb.co/4ZL4fcSd/chili.jpg",
    e: "🌿",
    lbl: "garden chili",
    quote: "Friendship is born at the moment one person says: 'What! You too?'",
    attr: "— C.S. Lewis",
  },
  {
    img: "https://i.ibb.co/gMS17QYF/IMG-20260426-173402.jpg",
    e: "🌻",
    lbl: "sunflower",
    quote: "Good friends are like stars — you don't always see them but you know they're there.",
    attr: "— Unknown",
  },
  {
    img: "https://i.ibb.co/FqJPPwpS/IMG-20260427-WA0001.jpg",
    e: "😂",
    lbl: "laughing",
    quote: "A friend is someone who makes it easy to believe in yourself.",
    attr: "— Heidi Wills",
  },
  {
    img: "https://i.ibb.co/KjPxLkyX/hana.jpg",
    e: "💐",
    lbl: "bouquet",
    quote: "A friend hears the song in my heart and sings it when my memory fails.",
    attr: "— Unknown",
  },
  {
    img: "https://i.ibb.co/spmg9TtX/IMG-20260427-WA0024.jpg",
    e: "🦋",
    lbl: "butterfly",
    quote: "Friends show their love in times of trouble, not just in times of happiness.",
    attr: "— Euripides",
  },
];

// ── STYLES ───────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #0a0d0a; color: #e8f0e8; min-height: 100vh; }

  /* ── AUTH ── */
  .lm-auth-page {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: radial-gradient(ellipse at 30% 20%, #0d2010 0%, #050805 60%, #020302 100%);
    padding: 20px; position: relative; overflow: hidden;
  }
  .lm-auth-page::before {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(45deg, transparent, transparent 60px,
      rgba(6,233,47,0.015) 60px, rgba(6,233,47,0.015) 61px);
  }
  .lm-auth-box {
    background: linear-gradient(135deg, rgba(1,40,1,0.85) 0%, rgba(5,20,10,0.95) 100%);
    border: 1px solid rgba(6,233,47,0.25); border-radius: 2px;
    padding: 44px 40px; width: 100%; max-width: 400px;
    position: relative; box-shadow: 0 0 60px rgba(6,233,47,0.08), 0 20px 60px rgba(0,0,0,0.6);
  }
  .lm-auth-box::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(6,233,47,0.8), transparent);
  }
  .lm-auth-logo { text-align: center; margin-bottom: 32px; }
  .lm-auth-logo .icon { font-size: 36px; margin-bottom: 8px; display: block; }
  .lm-auth-logo h1 { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: #c8f0c8; letter-spacing: 0.02em; }
  .lm-auth-logo p { font-size: 12px; color: rgba(150,200,150,0.6); margin-top: 4px; font-style: italic; letter-spacing: 0.08em; }
  .lm-auth-tabs { display: flex; margin-bottom: 28px; border-bottom: 1px solid rgba(6,233,47,0.15); }
  .lm-auth-tab {
    flex: 1; padding: 10px; background: none; border: none;
    color: rgba(150,200,150,0.5); font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; transition: color 0.2s; position: relative;
  }
  .lm-auth-tab.active { color: #7dff7d; }
  .lm-auth-tab.active::after {
    content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
    height: 2px; background: #06e92f;
  }
  .lm-form-group { margin-bottom: 18px; }
  .lm-form-group label { display: block; font-size: 11px; font-weight: 500; color: rgba(150,200,150,0.7); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 7px; }
  .lm-form-group input {
    width: 100%; background: rgba(0,0,0,0.4); border: 1px solid rgba(6,233,47,0.2);
    border-radius: 1px; padding: 11px 14px; color: #c8f0c8;
    font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .lm-form-group input:focus { border-color: rgba(6,233,47,0.6); box-shadow: 0 0 0 3px rgba(6,233,47,0.06); }
  .lm-form-group input::placeholder { color: rgba(100,140,100,0.4); }
  .lm-auth-btn {
    width: 100%; padding: 13px;
    background: linear-gradient(135deg, #014001, #026602);
    border: 1px solid rgba(6,233,47,0.4); color: #7dff7d;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
    transition: all 0.2s; border-radius: 1px; margin-top: 8px;
  }
  .lm-auth-btn:hover { background: linear-gradient(135deg, #025502, #038003); box-shadow: 0 0 20px rgba(6,233,47,0.2); }
  .lm-auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .lm-auth-error { background: rgba(200,0,0,0.15); border: 1px solid rgba(200,0,0,0.3); color: #ff9999; font-size: 12px; padding: 10px 14px; margin-bottom: 16px; border-radius: 1px; }
  .lm-auth-success { background: rgba(6,233,47,0.1); border: 1px solid rgba(6,233,47,0.3); color: #7dff7d; font-size: 12px; padding: 10px 14px; margin-bottom: 16px; border-radius: 1px; }

  /* ── GALLERY ── */
  .lm-gallery { min-height: 100vh; background: radial-gradient(ellipse at 20% 0%, #0d2010 0%, #060906 50%, #020302 100%); }
  .lm-header {
    padding: 20px 32px; display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid rgba(6,233,47,0.12); background: rgba(1,20,1,0.6);
    backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 100;
  }
  .lm-header-left { display: flex; align-items: center; gap: 12px; }
  .lm-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    border: 2px solid rgba(6,233,47,0.5);
    background: url('https://i.ibb.co/MxfWPRNt/lady-midnight.jpg') center/cover;
  }
  .lm-header-title { font-family: 'Playfair Display', serif; font-size: 18px; color: #c8f0c8; font-style: italic; }
  .lm-signout-btn {
    padding: 7px 16px; background: transparent; border: 1px solid rgba(6,233,47,0.3);
    color: rgba(120,180,120,0.8); font-family: 'DM Sans', sans-serif;
    font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s; border-radius: 1px;
  }
  .lm-signout-btn:hover { border-color: rgba(6,233,47,0.6); color: #7dff7d; }
  .lm-body { padding: 32px; }
  .lm-section-title {
    font-family: 'Playfair Display', serif; font-size: 13px;
    color: rgba(150,200,150,0.5); letter-spacing: 0.2em; text-transform: uppercase;
    margin-bottom: 24px; display: flex; align-items: center; gap: 12px;
  }
  .lm-section-title::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(6,233,47,0.2), transparent); }

  /* ── GRID ── */
  .lm-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
  @media (max-width: 600px) {
    .lm-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .lm-body { padding: 20px; }
    .lm-header { padding: 16px 20px; }
  }

  /* ── FLIP CARD ── */
  .lm-flip-card { aspect-ratio: 1; cursor: pointer; perspective: 800px; }
  .lm-flip-inner {
    width: 100%; height: 100%; position: relative;
    transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
  }
  .lm-flip-card.flipped .lm-flip-inner { transform: rotateY(180deg); }
  .lm-flip-face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 2px; overflow: hidden; }
  .lm-flip-front { background: #0d1a0d; border: 1px solid rgba(6,233,47,0.2); }
  .lm-flip-front img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
  .lm-flip-card:hover .lm-flip-front img { transform: scale(1.04); }
  .lm-flip-front-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%);
    display: flex; align-items: flex-end; padding: 12px;
  }
  .lm-flip-front-label { font-size: 11px; color: rgba(255,255,255,0.7); letter-spacing: 0.06em; font-style: italic; }
  .lm-flip-back {
    background: linear-gradient(135deg, #021a05 0%, #030e04 100%);
    border: 1px solid rgba(6,233,47,0.3);
    transform: rotateY(180deg);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 18px; text-align: center; gap: 8px; position: relative;
  }
  .lm-flip-back::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(6,233,47,0.7), transparent);
  }
  .lm-flip-back .lm-emoji { font-size: 26px; margin-bottom: 4px; }
  .lm-flip-back .lm-quote { font-family: 'Playfair Display', serif; font-size: clamp(11px, 1.1vw, 14px); font-style: italic; color: #b8ddb8; line-height: 1.6; }
  .lm-flip-back .lm-attr { font-size: 10px; color: rgba(100,160,100,0.6); margin-top: 2px; letter-spacing: 0.06em; }
`;

function injectStyles() {
  if (document.getElementById("lm-styles")) return;
  const el = document.createElement("style");
  el.id = "lm-styles";
  el.textContent = CSS;
  document.head.appendChild(el);
}

// ── LOCAL AUTH (in-memory, no Firebase) ─────────────────────
// Users persist for the browser session only.
// To persist across refreshes, replace `memoryStore` with localStorage calls.
const memoryStore = {};

function localSignUp(email, password, displayName) {
  return new Promise((resolve, reject) => {
    if (!email || !password || !displayName) {
      return reject(new Error("Please fill in all fields."));
    }
    if (password.length < 6) {
      return reject(new Error("Password must be at least 6 characters."));
    }
    if (memoryStore[email]) {
      return reject(new Error("An account with this email already exists."));
    }
    memoryStore[email] = { displayName, password };
    resolve({ email, displayName });
  });
}

function localSignIn(email, password) {
  return new Promise((resolve, reject) => {
    if (!email || !password) {
      return reject(new Error("Please fill in all fields."));
    }
    const record = memoryStore[email];
    if (!record) {
      return reject(new Error("No account found. Please sign up first."));
    }
    if (record.password !== password) {
      return reject(new Error("Incorrect password."));
    }
    resolve({ email, displayName: record.displayName });
  });
}

// ── FLIP CARD COMPONENT ──────────────────────────────────────
function FlipCard({ item }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`lm-flip-card${flipped ? " flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="lm-flip-inner">
        <div className="lm-flip-face lm-flip-front">
          <img src={item.img} alt={item.lbl} loading="lazy" />
          <div className="lm-flip-front-overlay">
            <span className="lm-flip-front-label">{item.lbl}</span>
          </div>
        </div>
        <div className="lm-flip-face lm-flip-back">
          <div className="lm-emoji">{item.e}</div>
          <div className="lm-quote">"{item.quote}"</div>
          <div className="lm-attr">{item.attr}</div>
        </div>
      </div>
    </div>
  );
}

// ── AUTH PAGE ────────────────────────────────────────────────
function AuthPage({ onLogin }) {
  const [tab, setTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => { setError(""); setSuccess(""); };

  const handleSignUp = async () => {
    reset();
    setLoading(true);
    try {
      await localSignUp(email, password, name);
      setSuccess("Account created! You can now sign in.");
      setTab("signin");
      setEmail(""); setPassword(""); setName("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    reset();
    setLoading(true);
    try {
      const user = await localSignIn(email, password);
      onLogin(user);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") tab === "signin" ? handleSignIn() : handleSignUp();
  };

  return (
    <div className="lm-auth-page">
      <div className="lm-auth-box">
        <div className="lm-auth-logo">
          <span className="icon">🌙</span>
          <h1>Lady Midnight</h1>
          <p>private gallery</p>
        </div>
        <div className="lm-auth-tabs">
          <button
            className={`lm-auth-tab${tab === "signin" ? " active" : ""}`}
            onClick={() => { setTab("signin"); reset(); }}
          >Sign In</button>
          <button
            className={`lm-auth-tab${tab === "signup" ? " active" : ""}`}
            onClick={() => { setTab("signup"); reset(); }}
          >Sign Up</button>
        </div>

        {error && <div className="lm-auth-error">{error}</div>}
        {success && <div className="lm-auth-success">{success}</div>}

        {tab === "signup" ? (
          <>
            <div className="lm-form-group">
              <label>Display Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="lm-form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="lm-form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button className="lm-auth-btn" onClick={handleSignUp} disabled={loading}>
              {loading ? "Creating…" : "Create Account"}
            </button>
          </>
        ) : (
          <>
            <div className="lm-form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="lm-form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button className="lm-auth-btn" onClick={handleSignIn} disabled={loading}>
              {loading ? "Signing in…" : "Enter Gallery"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── GALLERY PAGE ─────────────────────────────────────────────
function GalleryPage({ user, onSignOut }) {
  return (
    <div className="lm-gallery">
      <div className="lm-header">
        <div className="lm-header-left">
          <div className="lm-avatar" />
          <div className="lm-header-title">Lady Midnight ✨</div>
        </div>
        <button className="lm-signout-btn" onClick={onSignOut}>Sign Out</button>
      </div>
      <div className="lm-body">
        <div className="lm-section-title">
          My Gallery — {user.displayName || user.email}
        </div>
        <div className="lm-grid">
          {IMAGES.map((item, i) => (
            <FlipCard key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ROOT COMPONENT ───────────────────────────────────────────
export default function FrontEndOnlyGallery() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    injectStyles();
  }, []);

  return user
    ? <GalleryPage user={user} onSignOut={() => setUser(null)} />
    : <AuthPage onLogin={setUser} />;
}
