import { useState, useEffect } from "react";
import { useGameLogic } from "./hooks/useGameLogic";

function App() {
  // 🟢 INPUT CONTROLADO
  const [task, setTask] = useState("");

  // 🟢 ESTADO PARA ANIMACIÓN DE LEVEL UP
  const [levelUp, setLevelUp] = useState(false);

  // 🧠 LÓGICA DEL JUEGO (HOOK)
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

  // 🎮 EFECTO: CUANDO CAMBIA EL NIVEL → ANIMACIÓN
  useEffect(() => {
    setLevelUp(true);

    const timer = setTimeout(() => {
      setLevelUp(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user.level]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>TaskQuest</h1>

      {/* 🎮 NIVEL CON ANIMACIÓN */}
      <h2
        style={{
          transform: levelUp ? "scale(1.3)" : "scale(1)",
          transition: "transform 0.3s ease",
          color: levelUp ? "gold" : "black"
        }}
      >
        Nivel: {user.level}
      </h2>

      {/* 🟩 CONTENEDOR DE BARRA XP */}
      <div
        style={{
          width: "300px",
          border: "1px solid #000",
          margin: "0 auto"
        }}
      >
        {/* 🟢 BARRA INTERNA (ANIMADA + GLOW) */}
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

      {/* 📊 TEXTO XP */}
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