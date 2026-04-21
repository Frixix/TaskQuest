import { useState, useEffect } from "react";

const ACHIEVEMENTS = [
  { id: 1, title: "Primer paso", condition: 1 },
  { id: 2, title: "Productivo", condition: 5 },
  { id: 3, title: "Imparable", condition: 10 }
];

const STORAGE_KEY = "taskquest_data";

export function useGameLogic() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const [user, setUser] = useState({
    level: 1,
    xp: 0,
    xpToNextLevel: 100
  });

  // 🧠 CARGAR DATOS AL INICIAR
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);

      if (savedData) {
        const parsed = JSON.parse(savedData);

        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.user) setUser(parsed.user);
        if (parsed.achievements) setAchievements(parsed.achievements);
      }
    } catch (error) {
      console.error("Error cargando datos", error);
    }
  }, []);

  // 💾 GUARDAR AUTOMÁTICAMENTE
  useEffect(() => {
    const dataToSave = {
      tasks,
      user,
      achievements
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [tasks, user, achievements]);

  // 🟢 FUNCIONES

  const addTask = (task, setTask) => {
    if (task.trim() === "") return;

    if (editingId !== null) {
      const updatedTasks = tasks.map((tarea) => {
        if (tarea.id === editingId) {
          return { ...tarea, title: task };
        }
        return tarea;
      });

      setTasks(updatedTasks);
      setEditingId(null);
    } else {
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
    checkAchievements(updatedTasks);

    setUser((prevUser) => {
      let newXp = Math.max(0, prevUser.xp + xpChange);
      let newLevel = prevUser.level;
      let newXpToNextLevel = prevUser.xpToNextLevel;

      while (newXp >= newXpToNextLevel) {
        newXp -= newXpToNextLevel;
        newLevel += 1;
        newXpToNextLevel = Math.floor(newXpToNextLevel * 1.5);
      }

      if (newLevel > prevUser.level) {
        alert("¡Subiste de nivel!");
      }

      return {
        level: newLevel,
        xp: newXp,
        xpToNextLevel: newXpToNextLevel
      };
    });
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  };

  const startEditing = (tarea, setTask) => {
    setTask(tarea.title);
    setEditingId(tarea.id);
  };

  const checkAchievements = (updatedTasks) => {
    const completedCount = updatedTasks.filter((t) => t.completed).length;

    const unlockedIds = new Set(achievements.map((a) => a.id));

    const newAchievements = ACHIEVEMENTS.filter((a) => {
      return completedCount >= a.condition && !unlockedIds.has(a.id);
    });

    if (newAchievements.length > 0) {
      setAchievements((prev) => [...prev, ...newAchievements]);
      alert("¡Logro desbloqueado!");
    }
  };

  return {
    tasks,
    user,
    achievements,
    editingId,
    addTask,
    toggleTask,
    deleteTask,
    startEditing
  };
}