const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filter = document.getElementById('filter');
const notepadInput = document.getElementById('notepadInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const savedNotes = document.getElementById('savedNotes');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                <button class="complete-btn" onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        updateLocalStorage();
        renderTasks();
    }
}

// Function to edit a task
function editTask(index) {
    const newTaskText = prompt("Edit your task:", tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText.trim();
        updateLocalStorage();
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

// Function to toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    renderTasks();
}

// Function to filter tasks
filter.addEventListener('change', () => {
    const filterValue = filter.value;
    const filteredTasks = tasks.filter(task => {
        if (filterValue === 'completed') return task.completed;
        if (filterValue === 'active') return !task.completed;
        return true; // For 'all' tasks
    });
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                <button class="complete-btn" onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;
        taskList.appendChild(li);
    });
});

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to save notes
function renderNotes() {
    savedNotes.innerHTML = '';
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.innerHTML = `
            <span>${note.text}</span>
            <button class="delete-note-btn" onclick="deleteNote(${index})">Delete</button>
        `;
        savedNotes.appendChild(noteDiv);
    });
}

saveNoteBtn.addEventListener('click', () => {
    const noteText = notepadInput.value.trim();
    if (noteText) {
        notes.push({ text: noteText });
        notepadInput.value = '';
        updateNotesLocalStorage();
        renderNotes();
    }
});

// Function to delete a note
function deleteNote(index) {
    notes.splice(index, 1);
    updateNotesLocalStorage();
    renderNotes();
}

// Function to update notes in local storage
function updateNotesLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Initial render of tasks and notes
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    renderNotes();
});
addTaskBtn.addEventListener('click', addTask);
