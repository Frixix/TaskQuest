import { useState } from "react";

const ACHIEVEMENTS = [
  { id: 1, title: "Primer paso", condition: 1 },
  { id: 2, title: "Productivo", condition: 5 },
  { id: 3, title: "Imparable", condition: 10 }
];

function App() {
  // 🟢 ESTADOS
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const [user, setUser] = useState({
    level: 1,
    xp: 0,
    xpToNextLevel: 100
  });

  // 🟢 FUNCIONES

  const addTask = () => {
    if (task.trim() === "") return;

    if (editingId !== null) {
      // ✏️ EDITAR
      const updatedTasks = tasks.map((tarea) => {
        if (tarea.id === editingId) {
          return { ...tarea, title: task };
        }
        return tarea;
      });

      setTasks(updatedTasks);
      setEditingId(null);
    } else {
      // ➕ CREAR
      const newTask = {
        id: Date.now(),
        title: task,
        difficulty: "easy",
        xp: 10,
        completed: false
      };

      setTasks([...tasks, newTask]);
    }

    setTask("");
  };

  const toggleTask = (id) => {
    let xpChange = 0;

    const updatedTasks = tasks.map((tarea) => {
      if (tarea.id === id) {
        const newCompleted = !tarea.completed;

        xpChange = newCompleted ? tarea.xp : -tarea.xp;

        return {
          ...tarea,
          completed: newCompleted
        };
      }
      return tarea;
    });

    setTasks(updatedTasks);

    // 🏆 Revisar logros
    checkAchievements(updatedTasks);

    // ⚔️ Actualizar usuario (XP + nivel)
    setUser((prevUser) => {
      let newXp = Math.max(0, prevUser.xp + xpChange);
      let newLevel = prevUser.level;
      let newXpToNextLevel = prevUser.xpToNextLevel;
      if (newLevel > prevUser.level) {
      alert("¡Subiste de nivel!");
}

      while (newXp >= newXpToNextLevel) {
        newXp -= newXpToNextLevel;
        newLevel += 1;
        newXpToNextLevel = Math.floor(newXpToNextLevel * 1.5);
      }

      return {
        level: newLevel,
        xp: newXp,
        xpToNextLevel: newXpToNextLevel
      };
    });
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((tarea) => tarea.id !== id);
    setTasks(filteredTasks);
  };

  const startEditing = (tarea) => {
    setTask(tarea.title);
    setEditingId(tarea.id);
  };

  const checkAchievements = (updatedTasks) => {
    const completedCount = updatedTasks.filter(t => t.completed).length;

    const unlockedIds = new Set(achievements.map(a => a.id));

    const newAchievements = ACHIEVEMENTS.filter((a) => {
      return completedCount >= a.condition && !unlockedIds.has(a.id);
    });

    if (newAchievements.length > 0) {
      setAchievements((prev) => [...prev, ...newAchievements]);

      // 🔔 Feedback simple (luego lo mejoramos)
      alert("¡Logro desbloqueado!");
    }
  };

  // 🔵 UI
  return (
    <div>
      <h1>TaskQuest</h1>

      <div>
        <h2>Nivel: {user.level}</h2>
        <p>XP: {user.xp} / {user.xpToNextLevel}</p>
      </div>
      <div style={{ width: "300px", border: "1px solid #000" }}>
      <div
        style={{
          width: `${(user.xp / user.xpToNextLevel) * 100}%`,
          background: "green",
          height: "20px"
        }}
      ></div>
    </div>

      <input
        type="text"
        placeholder="Escribe una misión..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>
        {editingId !== null ? "Actualizar" : "Agregar"}
      </button>

      <h2>Misiones</h2>
      <ul>
        {tasks.map((tarea) => (
          <li
            key={tarea.id}
            style={{
              textDecoration: tarea.completed ? "line-through" : "none"
            }}
          >
            <span
              onClick={() => toggleTask(tarea.id)}
              style={{ cursor: "pointer" }}
            >
              {tarea.title} ({tarea.difficulty})
            </span>

            <button
              onClick={() => startEditing(tarea)}
              style={{ marginLeft: "10px" }}
            >
              ✏️
            </button>

            <button
              onClick={() => deleteTask(tarea.id)}
              style={{ marginLeft: "5px" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <h2>Logros</h2>
      <ul>
        {achievements.map((ach) => (
          <li key={ach.id}>{ach.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;