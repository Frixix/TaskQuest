import { useState } from "react";

function App() {
  // 🟢 ESTADOS
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // 🟢 FUNCIONES

const addTask = () => {
  if (task.trim() === "") return;

  const newTask = {
    id: Date.now(),
    title: task,
    completed: false
  };

  setTasks([...tasks, newTask]);

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
          onClick={() => toggleTask(tarea.id)}
          style={{
            textDecoration: tarea.completed ? "line-through" : "none",
            cursor: "pointer"
          }}
        >
          {tarea.title}
        </li>
        ))}
      </ul>
    </div>
  );

}

export default App;