var tasks = [];
var taskIdCounter = 1;
var storageKey = "tasks";


function loadTasks() {
    var savedData = localStorage.getItem(storageKey);

    if (savedData) {
        tasks = JSON.parse(savedData);

        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id >= taskIdCounter) {
                taskIdCounter = tasks[i].id + 1;
            }
        }

        console.log("task loaded successfully, total tasks:", tasks.length);
    } else {
        console.log("no task found");
    }
}

// Save tasks to localStorage
function saveTasks() {
    var jsonData = JSON.stringify(tasks, null, 2);
    localStorage.setItem(storageKey, jsonData);
}

// Add a new task
function addTask(taskName) {
    var newTask = {
        id: taskIdCounter,
        name: taskName,
        status: "pending"
    };

    taskIdCounter = taskIdCounter + 1;
    tasks.push(newTask);
    saveTasks();

    console.log("task added and saved successfully:", taskName);
    renderTasks();
}

// Mark a task as completed
function completeTask(id) {
    var found = false;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].status = "completed";
            console.log("task completed successfully:", tasks[i].name);
            found = true;
            break;
        }
    }

    if (found === false) {
        console.log("task not found with id:", id);
    } else {
        saveTasks();
    }

    renderTasks();
}

// Mark a task as cancelled
function cancelTask(id) {
    var found = false;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].status = "cancelled";
            console.log("task cancelled successfully:", tasks[i].name);
            found = true;
            break;
        }
    }

    if (found === false) {
        console.log("task not found with id:", id);
    } else {
        saveTasks();
    }

    renderTasks();
}

// Delete a task completely
function deleteTask(id) {
    var newTasks = [];

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== id) {
            newTasks.push(tasks[i]);
        }
    }

    tasks = newTasks;
    saveTasks();
    renderTasks();
}

// Draw the task list on the page
function renderTasks() {
    var listBox = document.getElementById("taskList");
    var emptyMessage = document.getElementById("emptyMessage");

    if (!listBox || !emptyMessage) {
        return;
    }

    listBox.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
        return;
    } else {
        emptyMessage.style.display = "none";
    }

    for (var i = 0; i < tasks.length; i++) {
        var t = tasks[i];

        var item = document.createElement("div");
        item.className = "task-item";

        var topRow = document.createElement("div");
        topRow.className = "task-top";

        var idSpan = document.createElement("span");
        idSpan.className = "task-id";
        idSpan.textContent = t.id;

        var statusClass = "status-pending";
        if (t.status === "completed") {
            statusClass = "status-completed";
        } else if (t.status === "cancelled") {
            statusClass = "status-cancelled";
        }

        var statusSpan = document.createElement("span");
        statusSpan.className = "task-status " + statusClass;
        statusSpan.textContent = t.status;

        topRow.appendChild(idSpan);
        topRow.appendChild(statusSpan);

        var nameClass = "task-name";
        if (t.status === "completed") {
            nameClass = "task-name done";
        }

        var nameBox = document.createElement("div");
        nameBox.className = nameClass;
        nameBox.textContent = t.name;

        var buttonBox = document.createElement("div");
        buttonBox.className = "task-buttons";

        if (t.status === "pending") {
            var completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.className = "btn-complete";
            completeBtn.onclick = (function (id) {
                return function () { completeTask(id); };
            })(t.id);

            var cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Cancel";
            cancelBtn.className = "btn-cancel";
            cancelBtn.onclick = (function (id) {
                return function () { cancelTask(id); };
            })(t.id);

            buttonBox.appendChild(completeBtn);
            buttonBox.appendChild(cancelBtn);
        }

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn-delete";
        deleteBtn.onclick = (function (id) {
            return function () { deleteTask(id); };
        })(t.id);

        buttonBox.appendChild(deleteBtn);

        item.appendChild(topRow);
        item.appendChild(nameBox);
        item.appendChild(buttonBox);
        listBox.appendChild(item);
    }
}

function init() {
    var addButton = document.getElementById("addBtn");
    var input = document.getElementById("taskNameInput");

    if (addButton && input) {
        addButton.addEventListener("click", function () {
            var taskName = input.value.trim();

            if (taskName === "") {
                return;
            }

            addTask(taskName);
            input.value = "";
        });

        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                addButton.click();
            }
        });
    }

    loadTasks();
    renderTasks();
}

console.log("Welcome to Task Manager");
document.addEventListener("DOMContentLoaded", init);