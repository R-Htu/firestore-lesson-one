import { useState } from "react";

const initialStories = [
  { username: "Aaru", seen: false },
  { username: "Aaru", seen: false },
  { username: "Leo", seen: false }
];

function StoryCard({ username, seen, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "10px",
        margin: "5px",
        borderRadius: "10px",
        cursor: "pointer",
        backgroundColor: seen ? "#ddd" : "#f94",
        color: "#000"
      }}
    >
      {username} {seen ? "(seen)" : "(new)"}
    </div>
  );
}

export default function Seen() {
  const [stories, setStories] = useState(initialStories);

  // 👇 mark seen
  const markSeen = (username) => {
    const updated = stories.map((story) =>
      story.username === username
        ? { ...story, seen: true }
        : story
    );

    setStories(updated);
  };

  // 👇 REMOVE FIRST ITEM (this shows index key bug)
  const removeFirst = () => {
    setStories(stories.slice(1));
  };

  return (
    <div>
      <h2>Stories</h2>

      <button onClick={removeFirst}>
        Remove First Story
      </button>

      <div style={{ marginTop: "10px" }}>
        {stories.map((story, index) => (
          <StoryCard
            key={index}   // ⚠️ index key (problem starts here)
            username={story.username}
            seen={story.seen}
            onClick={() => markSeen(story.username)}
          />
        ))}
      </div>
    </div>
  );
}