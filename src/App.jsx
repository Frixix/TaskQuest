import { useState, useEffect, useRef } from "react";
import { useGameLogic } from "./hooks/useGameLogic";
import levelUpSound from "./assets/sounds/level-up.mp3";

function App() {
  // 🟢 INPUT CONTROLADO
  const [task, setTask] = useState("");

  // 🟢 ESTADO PARA ANIMACIÓN DE LEVEL UP
  const [levelUp, setLevelUp] = useState(false);

  // 🔊 AUDIO PERSISTENTE
  const audioRef = useRef(null);

  // 🧠 GUARDAR NIVEL ANTERIOR
  const prevLevelRef = useRef(1);

  // 🧱 INICIALIZAR AUDIO (una sola vez)
  useEffect(() => {
    const audio = new Audio(levelUpSound);
    audio.volume = 0.5;
    audioRef.current = audio;
  }, []);

  // 🧠 LÓGICA DEL JUEGO
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

  // 🎮 DETECTAR SUBIDA DE NIVEL
  useEffect(() => {
    const prevLevel = prevLevelRef.current;

    console.log("Nivel actual:", user.level);
    console.log("Nivel anterior:", prevLevel);

    if (user.level > prevLevel) {
      console.log("🔥 SUBIÓ DE NIVEL 🔥");

      // 🎉 ANIMACIÓN
      setLevelUp(true);

      // 🔊 SONIDO
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play()
          .then(() => console.log("SONANDO"))
          .catch((e) => console.log("ERROR AUDIO:", e));
      }

      // ⏱️ quitar animación
      const timer = setTimeout(() => {
        setLevelUp(false);
      }, 800);

      return () => clearTimeout(timer);
    }

    // actualizar nivel previo
    prevLevelRef.current = user.level;
  }, [user.level]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>TaskQuest</h1>

      {/* 🔊 BOTÓN DE PRUEBA */}
      <button
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play()
              .then(() => console.log("SONANDO"))
              .catch((e) => console.log("ERROR AUDIO:", e));
          }
        }}
      >
        🔊 Probar sonido
      </button>

      {/* 🎮 NIVEL */}
      <h2
        style={{
          transform: levelUp ? "scale(1.3)" : "scale(1)",
          transition: "transform 0.3s ease",
          color: levelUp ? "gold" : "black"
        }}
      >
        Nivel: {user.level}
      </h2>

      {/* 🟩 BARRA XP */}
      <div
        style={{
          width: "300px",
          border: "1px solid #000",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            width: `${(user.xp / user.xpToNextLevel) * 100}%`,
            background: "green",
            height: "20px",
            transition: "width 0.5s ease",
            boxShadow: levelUp
              ? "0 0 10px gold, 0 0 20px gold"
              : "none"
          }}
        />
      </div>

      <p>XP: {user.xp} / {user.xpToNextLevel}</p>

      {/* 📝 INPUT */}
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder={
          editingId !== null
            ? "Editando misión..."
            : "Escribe una misión..."
        }
      />

      <button onClick={() => addTask(task, setTask)}>
        {editingId !== null ? "Actualizar" : "Agregar"}
      </button>

      {/* 📋 LISTA DE MISIONES */}
      <ul>
        {tasks.map((tarea) => (
          <li key={tarea.id}>
            <span
              onClick={() => toggleTask(tarea.id)}
              style={{
                cursor: "pointer",
                textDecoration: tarea.completed ? "line-through" : "none",
                color: tarea.completed ? "gray" : "white",
                transform: tarea.completed ? "scale(0.95)" : "scale(1)",
                transition: "all 0.2s ease"
              }}
            >
              {tarea.title} ({tarea.difficulty})
            </span>

            <button onClick={() => startEditing(tarea, setTask)}>
              ✏️
            </button>

            <button onClick={() => deleteTask(tarea.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>

      {/* 🏆 LOGROS */}
      <h2>Logros</h2>
      <ul>
        {achievements.map((a) => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;