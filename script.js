// ---------- Grab references to the elements we'll work with ----------
const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('note-list');
const counter = document.getElementById('counter');

// ---------- Load any tasks saved from last time ----------
// localStorage only stores strings, so we save/load tasks as JSON.
let tasks = JSON.parse(localStorage.getItem('corkboard-tasks')) || [];

// ---------- Save current tasks array back to localStorage ----------
function saveTasks() {
  localStorage.setItem('corkboard-tasks', JSON.stringify(tasks));
}

// ---------- Render the full list from the tasks array ----------
function renderTasks() {
  list.innerHTML = '';

  if (tasks.length === 0) {
    list.innerHTML = '<p class="empty-message">The board is empty — pin your first task above.</p>';
  }

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'note' + (task.done ? ' done' : '');
    li.dataset.id = task.id;

    li.innerHTML = `
      <span class="note__text">${escapeHtml(task.text)}</span>
      <button class="note__delete" aria-label="Delete task">&times;</button>
    `;

    // Click the note itself to toggle "done"
    li.addEventListener('click', (e) => {
      // Don't toggle if the click was on the delete button
      if (e.target.classList.contains('note__delete')) return;
      toggleTask(task.id);
    });

    // Click the × button to delete
    li.querySelector('.note__delete').addEventListener('click', () => {
      deleteTask(task.id);
    });

    list.appendChild(li);
  });

  updateCounter();
}

// ---------- Add a new task ----------
function addTask(text) {
  tasks.push({
    id: Date.now().toString(), // simple unique id
    text: text,
    done: false,
  });
  saveTasks();
  renderTasks();
}

// ---------- Toggle a task's done state ----------
function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  saveTasks();
  renderTasks();
}

// ---------- Remove a task ----------
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

// ---------- Update the "3 tasks left" line ----------
function updateCounter() {
  const remaining = tasks.filter((task) => !task.done).length;
  if (tasks.length === 0) {
    counter.textContent = 'Nothing pinned yet';
  } else if (remaining === 0) {
    counter.textContent = 'All done! 🎉';
  } else {
    counter.textContent = `${remaining} task${remaining === 1 ? '' : 's'} left`;
  }
}

// ---------- Basic safety: prevent typed HTML from breaking the page ----------
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---------- Handle the form submit (Enter key or clicking "Pin it") ----------
form.addEventListener('submit', (e) => {
  e.preventDefault(); // stop the page from reloading
  const text = input.value.trim();
  if (text === '') return;
  addTask(text);
  input.value = '';
  input.focus();
});

// ---------- Initial render on page load ----------
renderTasks();