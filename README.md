# 🎮 TaskQuest

TaskQuest es una aplicación tipo videojuego donde conviertes tus tareas diarias en misiones.  
Completa tareas, gana experiencia (XP), sube de nivel y desbloquea logros.

---

## 🚀 Features

- ✅ Crear, editar y eliminar tareas (misiones)
- ⚔️ Sistema de experiencia (XP)
- 📈 Subida de nivel progresiva
- 🏆 Sistema de logros desbloqueables
- 🔥 Penalizaciones por editar/eliminar tareas
- 📅 Opcional: fecha límite con recompensa extra
- 💾 Persistencia con localStorage
- 🎮 UI estilo RPG + minimalista gamer
- 🎧 Sonido al subir de nivel (level up)

---

## 🧠 Cómo funciona

- Cada tarea tiene dificultad → otorga XP
- Completar tareas suma XP
- Al alcanzar el límite → subes de nivel
- Editar o eliminar tareas → penaliza XP
- Logros se desbloquean automáticamente

---

## 🛠️ Tecnologías

- React
- JavaScript
- CSS (custom / variables)
- localStorage

---

## 📦 Instalación

```bash
npm install
npm run dev
📁 Estructura
src/
 ├── components/
 ├── hooks/
 ├── utils/
 ├── App.jsx
🗺️ Roadmap
 Sistema de tareas
 Sistema de XP
 Subida de nivel
 Logros
 Animaciones
 Sonidos
 Avatar tipo criatura (estilo Pokémon)
 Backend (opcional futuro)
🎯 Objetivo

Aprender React construyendo un sistema real con:

lógica compleja
estados derivados
arquitectura escalable
⚠️ Nota

Este proyecto está diseñado para aprender pensando como desarrollador real,
no como tutorial paso a paso.


---

# 📄 docs/PLAN.md

```md
# 🧠 PLAN DE DESARROLLO - TaskQuest

Este documento divide el proyecto en pasos pequeños y ejecutables.

---

# 🥇 FASE 1 — TAREAS (BASE)

## Objetivo:
Crear y manejar tareas sin lógica de juego aún.

### Paso 1
- Crear estructura básica React
- Renderizar App.jsx

### Paso 2
- Crear input para nueva tarea

### Paso 3
- Guardar tareas en estado (useState)

### Paso 4
- Mostrar lista de tareas

### Paso 5
- Marcar tarea como completada

### Paso 6
- Eliminar tarea

### Paso 7
- Editar tarea

---

# 🥈 FASE 2 — XP Y NIVELES

## Objetivo:
Convertir tareas en sistema de progreso

### Paso 8
- Agregar dificultad a tareas (easy, medium, hard)

### Paso 9
- Asignar XP según dificultad

### Paso 10
- Crear estado de usuario:
  - level
  - xp
  - xpToNextLevel

### Paso 11
- Al completar tarea → sumar XP

### Paso 12
- Sistema de subida de nivel

### Paso 13
- Penalización:
  - editar tarea → -XP
  - eliminar tarea → -XP doble

---

# 🥉 FASE 3 — LOGROS

## Objetivo:
Gamificación avanzada

### Paso 14
- Definir lista de logros

### Paso 15
- Detectar condiciones:
  - tareas completadas
  - tareas difíciles
  - rachas

### Paso 16
- Mostrar logros desbloqueados

---

# 🏅 FASE 4 — UI Y EXPERIENCIA

## Objetivo:
Sentir videojuego

### Paso 17
- Barra de XP

### Paso 18
- Mostrar nivel visual

### Paso 19
- Animación al subir nivel

### Paso 20
- Sonido "level up"

### Paso 21
- Diseño estilo RPG + minimalista

---

# 🧪 FASE 5 — EXTRAS

### Paso 22
- Avatar tipo criatura

### Paso 23
- Bonus por fecha límite

### Paso 24
- Guardado en localStorage
