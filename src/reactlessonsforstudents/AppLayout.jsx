import { useState } from "react";

// ── Icons ──────────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
    <path d="M9 22V12h6v10" />
  </svg>
);
const GridIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const BellIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);
const ChartIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const TeamIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
  </svg>
);
const SettingsIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
const HamburgerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const LogoutIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

// ── Nav config ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: HomeIcon },
  { id: "projects", label: "Projects", icon: GridIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon, badge: 4 },
  { id: "analytics", label: "Analytics", icon: ChartIcon },
  { divider: true },
  { id: "team", label: "Team", icon: TeamIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

const ACTIVITY = [
  { color: "bg-green-500", title: "Deployment to production", time: "2 minutes ago" },
  { color: "bg-indigo-500", title: "New team member joined — Jake Lee", time: "1 hour ago" },
  { color: "bg-amber-500", title: "Storage limit warning — 80% used", time: "3 hours ago" },
  { color: "bg-zinc-300", title: 'Project "Redesign" archived', time: "Yesterday" },
];

// ── Sidebar content (shared between desktop & mobile drawer) ───────────────
function SidebarContent({ active, setActive, onClose }) {
  return (
    <>
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-zinc-200 shrink-0 gap-2">
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">A</span>
        </div>
        <span className="font-semibold text-zinc-900 text-sm flex-1">Appbase</span>
        {onClose && (
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 transition-colors" aria-label="Close menu">
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item, i) => {
          if (item.divider) return <div key={i} className="h-px bg-zinc-200 my-2" />;
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); onClose?.(); }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left transition-colors duration-150 ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              <Icon />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-xs font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-zinc-200 px-3 py-3 shrink-0">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-xs font-semibold text-violet-700 shrink-0">
            MK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-900 truncate">Maya Kim</p>
            <p className="text-xs text-zinc-400 truncate">Free plan</p>
          </div>
          <button className="text-zinc-400 hover:text-zinc-600 transition-colors shrink-0" title="Log out">
            <LogoutIcon />
          </button>
        </div>
      </div>
    </>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function AppLayout() {
  const [active, setActive] = useState("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pageTitle = NAV_ITEMS.find((n) => n.id === active)?.label ?? "Dashboard";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="flex h-screen overflow-hidden bg-zinc-50">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r border-zinc-200 shrink-0">
        <SidebarContent active={active} setActive={setActive} onClose={null} />
      </aside>

      {/* ── Mobile overlay ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        className="fixed top-0 left-0 h-full w-56 bg-white border-r border-zinc-200 z-50 flex flex-col md:hidden transition-transform duration-200"
        style={{ transform: drawerOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <SidebarContent active={active} setActive={setActive} onClose={() => setDrawerOpen(false)} />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="h-14 bg-white border-b border-zinc-200 flex items-center px-4 gap-3 shrink-0">
          <button
            className="md:hidden text-zinc-500 hover:text-zinc-900 transition-colors"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>

          {/* Mobile logo */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="font-semibold text-zinc-900 text-sm">Appbase</span>
          </div>

          <p className="hidden md:block text-sm font-semibold text-zinc-900">{pageTitle}</p>

          <div className="ml-auto">
            <button className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all duration-150">
              + New project
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Projects", value: "12", color: "text-zinc-900" },
              { label: "Members", value: "8", color: "text-zinc-900" },
              { label: "Storage", value: <>4.2<span className="text-sm font-normal ml-0.5">GB</span></>, color: "text-zinc-900" },
              { label: "Uptime", value: <>99.9<span className="text-sm font-normal">%</span></>, color: "text-green-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white rounded-xl border border-zinc-200 p-4">
                <p className="text-xs text-zinc-500 mb-1">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Activity feed */}
          <div className="bg-white rounded-xl border border-zinc-200 p-5">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Recent activity</p>
            <div className="flex flex-col gap-4">
              {ACTIVITY.map(({ color, title, time }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full ${color} shrink-0 mt-1.5`} />
                  <div>
                    <p className="text-sm text-zinc-800 font-medium">{title}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
