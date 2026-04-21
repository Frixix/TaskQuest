import { useState, useEffect } from "react";
import { XP_VALUES, calculateLevel } from "../utils/xpSystem";

const STORAGE_KEY = "taskquest";

const ACHIEVEMENTS = [
  { id: 1, title: "Primer paso", condition: 1 },
  { id: 2, title: "Productivo", condition: 5 },
  { id: 3, title: "Imparable", condition: 10 }
];

export function useGameLogic() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const [user, setUser] = useState({
    level: 1,
    xp: 0,
    xpToNextLevel: 50 // más rápido para probar
  });

  // 🔁 Cargar localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setTasks(data.tasks || []);
      setUser(data.user || user);
      setAchievements(data.achievements || []);
    }
  }, []);

  // 💾 Guardar
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tasks, user, achievements })
    );
  }, [tasks, user, achievements]);

  const addTask = (task, setTask) => {
    if (!task.trim()) return;

    if (editingId !== null) {
      setTasks(tasks.map(t =>
        t.id === editingId ? { ...t, title: task } : t
      ));
      setEditingId(null);
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: task,
          difficulty: "easy",
          xp: XP_VALUES.easy,
          completed: false
        }
      ]);
    }

    setTask("");
  };

  const toggleTask = (id) => {
    let xpChange = 0;

    const updated = tasks.map((t) => {
      if (t.id === id) {
        const completed = !t.completed;
        xpChange = completed ? t.xp : -t.xp;
        return { ...t, completed };
      }
      return t;
    });

    setTasks(updated);
    updateUserXP(xpChange);
    checkAchievements(updated);
  };

  const updateUserXP = (xpChange) => {
    setUser(prev => calculateLevel(prev, xpChange));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const startEditing = (task, setTask) => {
    setTask(task.title);
    setEditingId(task.id);
  };

  const checkAchievements = (updatedTasks) => {
    const completed = updatedTasks.filter(t => t.completed).length;

    const unlocked = ACHIEVEMENTS.filter(a =>
      completed >= a.condition &&
      !achievements.some(x => x.id === a.id)
    );

    if (unlocked.length) {
      setAchievements([...achievements, ...unlocked]);
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