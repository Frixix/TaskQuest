import { useState } from "react";

function App() {
  // 🟢 ESTADOS
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

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
        difficulty: "easy", // por ahora fijo
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

        // calcular XP
        xpChange = newCompleted ? tarea.xp : -tarea.xp;

        return {
          ...tarea,
          completed: newCompleted
        };
      }
      return tarea;
    });

    setTasks(updatedTasks);

    // actualizar usuario
  setUser((prevUser) => {
    let newXp = Math.max(0, prevUser.xp + xpChange);
    let newLevel = prevUser.level;
    let newXpToNextLevel = prevUser.xpToNextLevel;

    // 🔁 subir de nivel si alcanza
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



  // 🔵 UI
  return (
    <div>
      <h1>TaskQuest</h1>
        <div>
          <h2>Nivel: {user.level}</h2>
          <p>XP: {user.xp} / {user.xpToNextLevel}</p>
        </div>

      <input
        type="text"
        placeholder="Escribe una misión..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Agregar</button>

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
    </div>
  );

}

export default App;