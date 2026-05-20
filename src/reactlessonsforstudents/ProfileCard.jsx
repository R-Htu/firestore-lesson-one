import { useState } from "react";

const ProfileCard = () => {
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(14);

  const handleFollow = () => {
    setFollowing((prev) => !prev);
    setFollowers((prev) => (following ? prev - 1 : prev + 1));
  };

  const formatCount = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "k" : n);

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-zinc-100 flex items-center justify-center p-6"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        className="max-w-sm w-full mx-auto bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm"
        style={{ transition: "box-shadow 0.2s" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 8px 32px 0 rgba(99,102,241,0.10)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 1px 3px 0 rgba(0,0,0,0.07)")
        }
      >
        {/* Banner */}
        <div
          className="h-24 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 60%, #38bdf8 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 70% 60%, rgba(255,255,255,0.10) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Avatar + Follow */}
        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <img
                src="https://api.dicebear.com/8.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4"
                className="w-20 h-20 rounded-full border-4 border-white bg-indigo-100"
                style={{ display: "block" }}
                alt="Alex avatar"
              />
              <span
                className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-white"
                style={{ background: "#22c55e" }}
              />
            </div>

            <button
              onClick={handleFollow}
              className="px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-150 active:scale-95 select-none"
              style={{
                background: following
                  ? "transparent"
                  : "linear-gradient(135deg, #6366f1, #7c3aed)",
                color: following ? "#6366f1" : "#fff",
                border: following ? "1.5px solid #6366f1" : "1.5px solid transparent",
                boxShadow: following ? "none" : "0 2px 8px rgba(99,102,241,0.25)",
              }}
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>

          {/* Name + handle */}
          <div className="mb-3">
            <p className="text-lg font-bold text-zinc-900 leading-tight">
              Alex Nguyen
            </p>
            <p className="text-sm text-zinc-500 mt-0.5">
              @alexn ·{" "}
              <span className="text-zinc-400">Full-stack dev</span>
              {" "}· 🇻🇳
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm text-zinc-500 leading-relaxed mb-5">
            Building things for the web. Loves Next.js, Tailwind, and strong
            coffee.{" "}
            <span className="text-indigo-500 font-medium cursor-pointer hover:underline">
              Open to collabs.
            </span>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-5 text-center">
            {[
              { value: formatCount(followers), label: "Followers" },
              { value: "312", label: "Following" },
              { value: "48", label: "Projects" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-xl py-2.5 cursor-default transition-colors duration-150"
                style={{ background: "#f4f4f5" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#ede9fe")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#f4f4f5")
                }
              >
                <p className="text-base font-bold text-zinc-900">{value}</p>
                <p className="text-xs text-zinc-500">{label}</p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              className="flex-1 py-2 text-sm font-semibold rounded-xl text-white transition-all duration-150 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                boxShadow: "0 2px 8px rgba(99,102,241,0.20)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.opacity = "0.92")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = "1")
              }
            >
              Message
            </button>
            <button
              className="flex-1 py-2 text-sm font-semibold rounded-xl transition-colors duration-150 text-zinc-700 border border-zinc-200"
              style={{ background: "#fff" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f4f4f5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#fff")
              }
            >
              Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
