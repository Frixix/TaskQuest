import { useState } from "react";

function App() {
  // 🟢 ESTADOS
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

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
  const updatedTasks = tasks.map((tarea) => {
    if (tarea.id === id) {
      return {
        ...tarea,
        completed: !tarea.completed
      };
    }
    return tarea;
  });

  setTasks(updatedTasks);
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
              textDecoration: tarea.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
          >
            <span onClick={() => toggleTask(tarea.id)}>
              {tarea.title}
            </span>{" "}

            <button 
              onClick={() => deleteTask(tarea.id)}
              style={{ marginLeft: "10px" }}
            >
              ❌
            </button>
            <button onClick={() => startEditing(tarea)}>
            ✏️
          </button>
          <span onClick={() => toggleTask(tarea.id)}>
            {tarea.title} ({tarea.difficulty})
          </span>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App;