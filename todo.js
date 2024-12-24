class taskManager {
    // private
    #tasks = [];

    constructor() {
        this.taskListElement = document.getElementById("taskList");
        this.loadTasks();
    }

    loadTasks() {
        
        const data = [
            {
                id: 1,
                title: "First todo",
                completed: false
            },
            {
                id: 2,
                title: "Second todo",
                completed: false
            },
            {
                id: 3,
                title: "third todo",
                completed: false
            },
            
        ];

        this.#tasks = this.getSavedTasks().concat(data);
        this.renderTask();
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.#tasks));
    }

    getSavedTasks() {
        var returnedData = localStorage.getItem("tasks");
        return returnedData ? JSON.parse(returnedData) : [];
    }

    addTasks(task) {
        this.#tasks.push(task);
        this.saveTasks();
        this.renderTask();
    }

    deleteTask(taskid) {
        this.#tasks = this.#tasks.filter(task => task.id !== taskid);
        this.saveTasks();
        this.renderTask();
    }
////////////////////////////////////////////////////////////////
    deleteall(){
        this.#tasks = []; 
        this.saveTasks(); 
        this.renderTask(); 
    }

/////////////////////////////////////////////////////////////////
    
    editTheTask(taskID) {
        const task = this.#tasks.find(task => task.id === taskID);
       
            const theEditing = prompt("Edit task ");
                task.title = theEditing; 
                this.saveTasks(); 
                this.renderTask();   
    }
    
    toggleCompleted(taskID) {
        var task = this.#tasks.find(task => task.id == taskID);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTask();
        }
    }

    renderTask() {
        this.taskListElement.innerHTML = "";

        this.#tasks.forEach(task => {
            var listItem = document.createElement("li");
            listItem.className = task.completed ? "completed" : '';
            listItem.innerHTML = `
            <span>${task.title}</span>
            <div>
            <button class="delete" onclick="taskList.deleteTask(${task.id})">Delete</button>
            <button onclick="taskList.toggleCompleted(${task.id})">
            ${task.completed ? "undo" : "complete"}

            <button onclick="taskList.editTheTask(${task.id})">Edit</button>
       
            </button>
            </div>`;
            this.taskListElement.appendChild(listItem);
        });
    }

    
}


var taskList = new taskManager();

document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    var inputValue = document.getElementById("taskInput");
    let taskData = {
        id: Date.now(),
        title: inputValue.value,
        completed: false
    };

    taskList.addTasks(taskData);
    inputValue.value = "";
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById("deleteall").addEventListener("click", function() {
    taskList.deleteall();
});

//////////////////////////




