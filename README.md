<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Corkboard To-Do</title>

  <!-- Two fonts: a handwriting-style display face, and a clean body face -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <main class="board">
    <header class="board__header">
      <h1>Pinned Today</h1>
      <p class="subtitle" id="counter">Nothing pinned yet</p>
    </header>

    <form id="note-form" class="note-form">
      <input
        type="text"
        id="note-input"
        placeholder="Write a task..."
        autocomplete="off"
        required
      />
      <button type="submit">Pin it</button>
    </form>

    <ul id="note-list" class="note-list">
      <!-- Sticky-note tasks get added here by script.js -->
    </ul>
  </main>








  :root {
  --cork: #b98d5e;
  --cork-dark: #97703f;
  --ink: #2b2b28;
  --ink-soft: #5c5850;

  --note-yellow: #ffe066;
  --note-pink: #ff9fb2;
  --note-blue: #7ec8e3;
  --pin-red: #e63946;

  --display-font: 'Caveat', cursive;
  --body-font: 'Inter', system-ui, sans-serif;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  font-family: var(--body-font);
  color: var(--ink);

  /* corkboard texture using layered radial dots + base color */
  background-color: var(--cork);
  background-image:
    radial-gradient(circle at 20% 30%, rgba(0,0,0,0.06) 1px, transparent 1.5px),
    radial-gradient(circle at 60% 70%, rgba(0,0,0,0.06) 1px, transparent 1.5px),
    radial-gradient(circle at 80% 20%, rgba(0,0,0,0.05) 1px, transparent 1.5px);
  background-size: 22px 22px;
  display: flex;
  justify-content: center;
  padding: 48px 20px;
}

.board {
  width: 100%;
  max-width: 560px;
}

/* ---------- Header ---------- */
.board__header {
  text-align: center;
  margin-bottom: 28px;
}

.board__header h1 {
  font-family: var(--display-font);
  font-size: 3.2rem;
  font-weight: 700;
  color: #fffaf0;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.15);
  margin: 0;
  transform: rotate(-2deg);
}

.subtitle {
  font-family: var(--body-font);
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff6e6;
  opacity: 0.85;
  margin: 4px 0 0;
}

/* ---------- Add-task form ---------- */
.note-form {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
}

.note-form input {
  flex: 1;
  padding: 12px 14px;
  border: none;
  border-radius: 6px;
  font-family: var(--body-font);
  font-size: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.note-form input:focus {
  outline: 3px solid #fff6e6;
  outline-offset: 1px;
}

.note-form button {
  padding: 12px 18px;
  border: none;
  border-radius: 6px;
  background: var(--pin-red);
  color: white;
  font-family: var(--body-font);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: transform 0.15s ease;
}

.note-form button:hover { transform: translateY(-1px); }
.note-form button:active { transform: translateY(1px); }

/* ---------- Sticky notes list ---------- */
.note-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 22px;
}

.note {
  position: relative;
  padding: 22px 18px 18px;
  border-radius: 3px;
  font-family: var(--display-font);
  font-size: 1.5rem;
  line-height: 1.25;
  color: var(--ink);
  box-shadow: 3px 4px 10px rgba(0,0,0,0.25);
  cursor: pointer;
  transition: transform 0.15s ease;
}

.note:hover { transform: scale(1.02); }

/* Alternate rotation + color per note for a hand-pinned feel */
.note:nth-child(3n+1) { background: var(--note-yellow); transform: rotate(-3deg); }
.note:nth-child(3n+2) { background: var(--note-pink);   transform: rotate(2deg); }
.note:nth-child(3n)   { background: var(--note-blue);   transform: rotate(-1.5deg); }
.note:nth-child(3n+1):hover { transform: rotate(-3deg) scale(1.02); }
.note:nth-child(3n+2):hover { transform: rotate(2deg) scale(1.02); }
.note:nth-child(3n):hover   { transform: rotate(-1.5deg) scale(1.02); }

/* Pushpin */
.note::before {
  content: "";
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ff6b6b, var(--pin-red) 70%);
  box-shadow: 0 2px 3px rgba(0,0,0,0.4);
}

.note__text {
  display: block;
  word-break: break-word;
}

/* Completed state: crossed out + faded, like a stamped note */
.note.done .note__text {
  text-decoration: line-through;
  opacity: 0.55;
}

.note.done::after {
  content: "DONE";
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-family: var(--body-font);
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 1px;
  color: var(--pin-red);
  border: 2px solid var(--pin-red);
  border-radius: 4px;
  padding: 1px 6px;
  transform: rotate(-8deg);
  opacity: 0.85;
}

/* Delete button */
.note__delete {
  position: absolute;
  top: 6px;
  right: 8px;
  border: none;
  background: transparent;
  font-family: var(--body-font);
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink-soft);
  cursor: pointer;
  line-height: 1;
  padding: 2px 5px;
}

.note__delete:hover { color: var(--pin-red); }

/* Empty state */
.empty-message {
  text-align: center;
  font-family: var(--body-font);
  color: #fff6e6;
  opacity: 0.8;
  font-size: 0.9rem;
  padding: 20px;
}

@media (max-width: 420px) {
  .board__header h1 { font-size: 2.4rem; }
}

  <script src="script.js"></script>
</body>
</html>   


