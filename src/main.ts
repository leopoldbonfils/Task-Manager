// Define the structure of a single Task using an Interface
interface Task {
  id: number;
  name: string;
  status: "pending" | "completed" | "cancelled";
}

// Global state variables
let tasks: Task[] = [];
let currentFilter: "all" | "pending" | "completed" = "all";
const storageKey = "tasks";

// Select elements from the HTML
const taskNameInput = document.getElementById("taskNameInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const taskListContainer = document.getElementById("taskList") as HTMLDivElement;
const emptyMessage = document.getElementById("emptyMessage") as HTMLDivElement;
const clearCompletedBtn = document.getElementById("clearCompletedBtn") as HTMLButtonElement;



// Filter buttons
const filterTabs = document.querySelectorAll(".filter-tab") as NodeListOf<HTMLButtonElement>;

/**
 * Loads tasks from the browser's localStorage.
 */
function loadTasks(): void {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      tasks = JSON.parse(saved);
    } catch {
      tasks = [];
    }
  }
}

/**
 * Saves tasks to storage, updates statistics, and redraws the UI list.
 * This helper function keeps everything synchronized.
 */
function saveAndRefresh(): void {
  // 1. Save list to storage
  localStorage.setItem(storageKey, JSON.stringify(tasks));

  // 2. Redraw the list
  renderTasks();
}

/**
 * Adds a new task to our list.
 */
function addTask(): void {
  const name = taskNameInput.value.trim();
  if (name === "") return; // Don't add empty tasks

  const newTask: Task = {
    id: Date.now(), // Generate a unique ID using current timestamp
    name: name,
    status: "pending"
  };

  tasks.push(newTask);
  taskNameInput.value = ""; // Clear input field
  saveAndRefresh();
}

/**
 * Builds the tasks inside the HTML list depending on the selected filter.
 */
function renderTasks(): void {
  taskListContainer.innerHTML = ""; // Clear current list first

  // 1. Filter tasks
  let filtered = tasks;
  if (currentFilter === "pending") {
    filtered = tasks.filter(t => t.status === "pending");
  } else if (currentFilter === "completed") {
    filtered = tasks.filter(t => t.status === "completed");
  }

  // 2. Show or hide empty state message
  emptyMessage.style.display = filtered.length === 0 ? "flex" : "none";

  // 3. Create HTML elements for each task card
  filtered.forEach(task => {
    // Create card wrapper
    const item = document.createElement("div");
    item.className = "task-item";
    if (task.status === "completed") {
      item.classList.add("completed-item");
    }

    // Task text label
    const titleSpan = document.createElement("span");
    titleSpan.className = "task-title";
    titleSpan.textContent = task.name;

    // Status text badge
    const badge = document.createElement("span");
    badge.className = `task-status-badge badge-${task.status}`;
    badge.textContent = task.status;

    // Left elements container (label + badge)
    const leftPart = document.createElement("div");
    leftPart.className = "task-left";
    leftPart.appendChild(titleSpan);
    leftPart.appendChild(badge);

    // Right elements container (for action buttons)
    const actions = document.createElement("div");
    actions.className = "task-actions";

    // Text button to complete task (only for pending tasks)
    if (task.status === "pending") {
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "Complete";
      completeBtn.className = "btn-text btn-text-complete";
      completeBtn.addEventListener("click", () => {
        task.status = "completed";
        saveAndRefresh();
      });
      actions.appendChild(completeBtn);
    }

    // Text button to cancel task (only for pending tasks)
    if (task.status === "pending") {
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.className = "btn-text btn-text-cancel";
      cancelBtn.addEventListener("click", () => {
        task.status = "cancelled";
        saveAndRefresh();
      });
      actions.appendChild(cancelBtn);
    }

    // Text button to reopen/mark as pending (for completed or cancelled tasks)
    if (task.status !== "pending") {
      const reopenBtn = document.createElement("button");
      reopenBtn.textContent = "Mark Pending";
      reopenBtn.className = "btn-text btn-text-reopen";
      reopenBtn.addEventListener("click", () => {
        task.status = "pending";
        saveAndRefresh();
      });
      actions.appendChild(reopenBtn);
    }

    // Text button to delete task
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn-text btn-text-delete";
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Delete "${task.name}"?`)) {
        tasks = tasks.filter(t => t.id !== task.id);
        saveAndRefresh();
      }
    });
    actions.appendChild(deleteBtn);

    // Assemble and append task card
    item.appendChild(leftPart);
    item.appendChild(actions);
    taskListContainer.appendChild(item);
  });
}

// Bind event listeners to HTML buttons
addBtn.addEventListener("click", addTask);

// Press Enter to add a task
taskNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Configure filter tab buttons
filterTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    filterTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    
    // Set the filter based on data-filter attribute
    currentFilter = tab.getAttribute("data-filter") as any;
    renderTasks();
  });
});

// Clear Completed button listener
clearCompletedBtn.addEventListener("click", () => {
  const completedCount = tasks.filter(t => t.status === "completed").length;
  if (completedCount > 0 && confirm(`Clear all ${completedCount} completed tasks?`)) {
    tasks = tasks.filter(t => t.status !== "completed");
    saveAndRefresh();
  }
});

// Load tasks from storage and render on start
loadTasks();
saveAndRefresh();
