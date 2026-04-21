import { useState } from "react";
import { useGameLogic } from "./hooks/useGameLogic";

function App() {
  const [task, setTask] = useState("");

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

  return (
    <div>
      <h1>TaskQuest</h1>

      <h2>Nivel: {user.level}</h2>

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
            transition: "width 0.5s ease"
          }}
        />
      </div>

      <p>XP: {user.xp} / {user.xpToNextLevel}</p>

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

      <ul>
        {tasks.map((tarea) => (
          <li key={tarea.id}>
            <span onClick={() => toggleTask(tarea.id)}>
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