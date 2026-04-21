import { useState, useEffect, useRef } from "react";
import { useGameLogic } from "./hooks/useGameLogic";
import levelUpSound from "./assets/sounds/level-up.mp3";

function App() {
  const [task, setTask] = useState("");
  const [levelUp, setLevelUp] = useState(false);

  const audioRef = useRef(null);
  const prevLevelRef = useRef(1);

  useEffect(() => {
    const audio = new Audio(levelUpSound);
    audio.volume = 0.5;
    audioRef.current = audio;
  }, []);

  const {
    tasks,
    user,
    achievements,
    editingId,
    addTask,
    toggleTask,
    deleteTask,
    startEditing
  } = useGameLogic();

  useEffect(() => {
    if (user.level > prevLevelRef.current) {
      setLevelUp(true);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      setTimeout(() => setLevelUp(false), 800);
    }

    prevLevelRef.current = user.level;
  }, [user.level]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>TaskQuest</h1>

      <h2
        style={{
          transform: levelUp ? "scale(1.3)" : "scale(1)",
          color: levelUp ? "gold" : "white",
          transition: "0.3s"
        }}
      >
        Nivel {user.level}
      </h2>

      <div style={{ width: 300, margin: "auto", border: "1px solid white" }}>
        <div
          style={{
            width: `${(user.xp / user.xpToNextLevel) * 100}%`,
            height: 20,
            background: "lime",
            transition: "0.5s"
          }}
        />
      </div>

      <p>{user.xp} / {user.xpToNextLevel} XP</p>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Nueva misión..."
      />

      <button onClick={() => addTask(task, setTask)}>
        {editingId ? "Actualizar" : "Agregar"}
      </button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <span
              onClick={() => toggleTask(t.id)}
              style={{
                cursor: "pointer",
                textDecoration: t.completed ? "line-through" : "none"
              }}
            >
              {t.title}
            </span>

            <button onClick={() => startEditing(t, setTask)}>✏️</button>
            <button onClick={() => deleteTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>

      <h3>Logros</h3>
      <ul>
        {achievements.map(a => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;