import { useState, useEffect } from "react";
import { injectStyles } from "./utils/styles";
import AuthPage from "./components/AuthPage";
import GalleryPage from "./components/GalleryPage";

/**
 * LadyMidnightGallery — root component.
 *
 * Renders AuthPage when logged out, GalleryPage when logged in.
 * No Firebase — auth is handled locally via utils/auth.js.
 *
 * Usage in your project:
 *   import LadyMidnightGallery from './lady-midnight/App';
 *   export default function App() { return <LadyMidnightGallery />; }
 */
export default function LadyMidnightGallery() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    injectStyles();
  }, []);

  return user
    ? <GalleryPage user={user} onSignOut={() => setUser(null)} />
    : <AuthPage onLogin={setUser} />;
}
