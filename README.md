# Task Manager CLI Application

A simple **Task Manager Command Line Application** built with **Node.js**.  
This application allows users to create, manage, and track tasks directly from the terminal.

The project demonstrates the use of Node.js modules, user input handling, file operations, and JSON data storage.

---

## Features

- ✅ Add new tasks
- ✅ View all tasks
- ✅ Complete tasks
- ✅ Cancel tasks
- ✅ Save tasks permanently using JSON file storage
- ✅ Load previous tasks when the application starts
- ✅ Generate unique task IDs automatically

---

## Technologies Used

### Node.js
Used to create and run the command-line application.

### Readline Module
Used to communicate with users through the terminal.

Example:

```javascript
const readline = require("readline");
```

It allows the application to receive user input.

### File System Module (fs)

Used for reading and writing task data.

Example:

```javascript
const fs = require("fs");
```

It stores tasks inside a JSON file.

---

## Project Structure

```
Task-Manager/
│
├── app.js          # Main application file
├── task.json       # Stores task data
└── README.md       # Project documentation
```

---

## How It Works

When the application starts:

1. The program loads existing tasks from `task.json`.
2. A menu is displayed to the user.
3. The user selects an operation.
4. The selected function is executed.
5. Changes are saved automatically.

---

## Application Menu

```
====== Task Manager List ======

1. Add Task
2. Complete Task
3. Cancel Task
4. List All Tasks
5. Exit
```

---

## Installation and Setup

### 1. Clone this repository

```bash
git clone https://github.com/yourusername/task-manager.git
```

### 2. Navigate to the project folder

```bash
cd task-manager
```

### 3. Run the application

```bash
node app.js
```

---

## Example Usage

### Add a Task

```
Enter your choice: 1

Enter task name: Learn Node.js

Task added successfully
```

---

### View Tasks

```
Enter your choice: 4


Task ID: 1
Task Name: Learn Node.js
Task Status: pending
```

---

### Complete a Task

```
Enter your choice: 2

Enter task id to finished: 1

Task completed successfully
```

---

### Cancel a Task

```
Enter your choice: 3

Enter task id to cancel: 1

Task cancelled successfully
```

---

## Data Storage

Tasks are stored in a JSON file:

`task.json`

Example:

```json
[
  {
    "id": 1,
    "name": "Learn Node.js",
    "status": "completed"
  }
]
```

---

## Future Improvements

Possible improvements:

- Add task deadlines
- Add task priority levels
- Add user authentication
- Connect with a database (MySQL/MongoDB)
- Create a web interface
- Add search functionality

---

## Learning Objectives

Through this project, I learned:

- How to use Node.js modules
- How to work with the File System (`fs`)
- How to handle user input using `readline`
- How to store data using JSON
- How to create interactive CLI applications

---

## Author

**Mugisha Leopold**

GitHub:  
https://github.com/leopoldbonfils

---

## License

This project is for learning and educational purposes.
