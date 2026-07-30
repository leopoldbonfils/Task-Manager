const readline = require('readline');
const fs = require('fs');
const task = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var fileName="task.json";
var tasks = [];
var taskIdCounter = 1;

function loadTasks(){
    if(fs.existsSync(fileName)){
        var fileData = fs.readFileSync(fileName,"utf-8");
        tasks = JSON.parse(fileData);

        for(var i=0;i<tasks.length;i++){
            if(tasks[i].id >= taskIdCounter){
                taskIdCounter = tasks[i].id+1;
         
            }
        }
        
            console.log("task loaded successfully from file, total tasks:", tasks.length);
    }else{
        console.log("no task found");
    }
    
}

function saveTasks(){
    var jsonData = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(fileName,jsonData,"utf-8");
}

function showTaskMenu(){
    console.log("======Task Manager List:=========")
    console.log("1. add task")
    console.log("2. complete task")
    console.log("3.cancel task")
    console.log ("4. list all tasks")
    console.log("5. exit")

    
    task.question("enter your choice(1-5):", function(choice){
        if(choice === "1"){
            addTask();
        }else if(choice === "2"){
            completeTask();
        }else if(choice === "3"){
            cancelTask();
        }else if(choice === "4"){
            listTasks();
        }else if(choice === "5"){
            console.log("==== exiting task manager Bye bye (: ======");
            task.close();
        }else{
            console.log("number is not exiting in the list please enter valid number");
            showTaskMenu();
        }

    })
}

function addTask(){
    task.question("Enter task name:", function(taskName){
        console.log("task added successfully:", taskName);
        var newTask ={
            id:taskIdCounter, 
            name:taskName,
            status:"pending"
        }
        taskIdCounter = taskIdCounter + 1;
        tasks.push(newTask);
        saveTasks();
        console.log("task saved successfully in file:", taskName);
        showTaskMenu();

    });
}

function completeTask(){
    task.question("Enter task id to finished:", function(taskId){
        var id= Number(taskId); 
        var found = false;
        for(var i=0; i<tasks.length; i++){ 
            if(tasks[i].id === id){
                tasks[i].status = "completed";
                console.log("task completed successfully:", tasks[i].name);
                found = true;
                break;
            }}
            if(found === false){
                console.log("task not found with id:", id);
            }else{
                saveTasks();
            }
            showTaskMenu();

    })
}

function cancelTask(){
    
    task.question("Enter task Id to cancel:", function(taskId){
        var id = Number(taskId); 
        var found = false;

        for(var i=0; i<tasks.length; i++){
            if(tasks[i].id === id){
                tasks[i].status = "cancelled";
                console.log("task cancelled successfully:", tasks[i].name);
                found = true;
                break;
            }
        }
        if(found === false){
            console.log("task not found with id:", id);
        }else{
            saveTasks();
        }
        showTaskMenu();
    })
}

function listTasks(){
    if(tasks.length===0){
        console.log("no task exist");
    
    }else{
        console.log("======task list=======");
        for(var i=0;i<tasks.length;i++){
            console.log("task id:",tasks[i].id,"task name:",tasks[i].name,"task status:",tasks[i].status); 
        }
    }

    showTaskMenu(); 
}

console.log("Welcome to Task Manager");
loadTasks();

showTaskMenu();