# 🧱 ARQUITECTURA - TaskQuest

---

## 🧠 Filosofía

Separar:
- UI (componentes)
- lógica (hooks)
- reglas (utils)

---

## 📁 Estructura


src/
├── components/
│ ├── TaskList.jsx
│ ├── TaskItem.jsx
│ ├── XPBar.jsx
│ ├── LevelInfo.jsx
│ ├── Achievements.jsx
│
├── hooks/
│ └── useGameLogic.js
│
├── utils/
│ ├── xpSystem.js
│ └── achievementSystem.js
│
├── App.jsx


---

## 🔄 Flujo de datos


User Action → Component → Hook → Update State → Re-render UI


---

## 🧠 Estado principal

### Usuario
```js
{
  level: 1,
  xp: 0,
  xpToNextLevel: 100
}
Tareas
[
  {
    id,
    title,
    difficulty,
    xp,
    completed
  }
]
⚙️ Lógica central

Se maneja en:

useGameLogic.js

Responsabilidades:

completar tareas
calcular XP
subir nivel
aplicar penalizaciones
desbloquear logros
🧮 Reglas del sistema
completar tarea → +XP
editar tarea → -XP
eliminar tarea → -XP (doble)
subir nivel → recalcular XP requerido
🚫 Anti-patterns (EVITAR)
lógica dentro de componentes
múltiples estados duplicados
funciones gigantes
🚀 Escalabilidad futura
Context API (estado global)
Backend (Firebase)
Sistema de usuarios
Guardado en la nube
🎯 Objetivo técnico

Construir una app donde:

la lógica esté desacoplada
el estado sea predecible
el crecimiento no rompa el código

---

# 🚀 Siguiente paso

Ahora sí, vamos como equipo:

👉 dime: **“empezamos fase 1 paso 1”**

y te guío ultra fino (nivel ridículamente claro como pediste).