import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

/**
 * AuthPage — full-screen login/register page with tab switcher.
 *
 * Props:
 *   onLogin: (user: { email, displayName }) => void
 */
export default function AuthPage({ onLogin }) {
  const [tab, setTab] = useState("signin");
  const [success, setSuccess] = useState("");

  const switchTab = (t) => {
    setTab(t);
    setSuccess("");
  };

  const handleSignUpSuccess = () => {
    setSuccess("Account created! You can now sign in.");
    setTab("signin");
  };

  return (
    <div className="lm-auth-page">
      <div className="lm-auth-box">

        {/* Logo */}
        <div className="lm-auth-logo">
          <span className="icon">🌙</span>
          <h1>Lady Midnight</h1>
          <p>private gallery</p>
        </div>

        {/* Tabs */}
        <div className="lm-auth-tabs">
          <button
            className={`lm-auth-tab${tab === "signin" ? " active" : ""}`}
            onClick={() => switchTab("signin")}
          >
            Sign In
          </button>
          <button
            className={`lm-auth-tab${tab === "signup" ? " active" : ""}`}
            onClick={() => switchTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Success banner (shown after sign-up) */}
        {success && <div className="lm-auth-success">{success}</div>}

        {/* Active form */}
        {tab === "signin"
          ? <SignIn onLogin={onLogin} />
          : <SignUp onSuccess={handleSignUpSuccess} />
        }

      </div>
    </div>
  );
}
