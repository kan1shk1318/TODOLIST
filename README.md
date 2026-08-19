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

  <script src="script.js"></script>
</body>
</html>   


