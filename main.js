
const newTaskInput = document.getElementById('newtask');
const taskList = document.querySelector('.app__tasks');
const storedTasks = () => {
    if(localStorage.getItem('tasks')) {
        return JSON.parse(localStorage.getItem('tasks'));
    } else {
        return [];
    }
};


// Function to add tasks to task lists from local storage when domcument loaded
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem('tasks')) {
        createTasksFromLocalStorage(storedTasks())
    } else {
        addEmptyList()
    }
})


// Event listener for the new task input
newTaskInput.addEventListener(("keydown"), (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});


//----------------------------------------------------------
// Tasks Manager Functions 
//----------------------------------------------------------

// Function to add the task from new task input to the task list
function addTask() {
    const newTask = newTaskInput.value;
    const newTaskObj = {task: newTask, checked: false};
    createTaskElement(newTaskObj);
    addTaskToLocalStorage(storedTasks(), newTaskObj);
    newTaskInput.value = "";
}

// Function to create the task element
function createTaskElement(task) {
    const emptyList = document.querySelector('.app__tasks-empty');
    if(emptyList) {
        emptyList.remove();
    }
    const taskElement = document.createElement('div');
    taskElement.classList.add('app__task');
    if(task.checked) {
        taskElement.classList.add('app__task--complated');
    }

    const taskElementHtml = `<button class="app__taskcheck"><img src="./images/icon-check.svg"/></button>
    <input type="text" class="app__input" value="${task.task}" disabled>
    <button class="app__taskdelete"><img src="./images/icon-cross.svg"/></button>`;
    
    let fragment = document.createRange().createContextualFragment(taskElementHtml);

    fragment.querySelector(".app__taskdelete").addEventListener("click", () => {
            deleteTask(storedTasks(),taskElement, task);
        });

    fragment.querySelector(".app__taskcheck").addEventListener("click", () => {
            checkTask(storedTasks(),taskElement, task);
        });

    taskElement.appendChild(fragment);
    taskList.insertAdjacentElement("afterbegin", taskElement);
}

// Function for delete the task
function deleteTask(tasks, taskElement, task) {
    taskElement.remove();
    removeTaskFromLocalStorage(tasks, task);
    if(tasks.length === 0) {
        addEmptyList();
    }
}

// Function to check the task and make it complated
function checkTask(tasks, taskElement, task) {
    taskElement.classList.toggle("app__task--complated");
    checkTaskInLocalStorage(tasks, task)
}



//----------------------------------------------------------
// Edite App Functions 
//----------------------------------------------------------

// Function to add empty list when there are no tasks
function addEmptyList() {
    if(document.querySelector('.app__tasks-empty')) {
        return;
    }
    const emptyListHtml = `<div class="app__tasks-empty"><p class="app__tasks-emptytext">There are no tasks</p><img src="./images/illustration-empty.svg" alt="empty list" class="app__tasks-emptyimage"></div>`;
    taskList.insertAdjacentHTML("afterbegin", emptyListHtml);
}


//----------------------------------------------------------
// Local Storage Functions 
//----------------------------------------------------------

// Function to create tasks from local storage
function createTasksFromLocalStorage(tasks) {
    if(tasks.length > 0) {
        tasks.forEach(task => {
            createTaskElement(task);
        });
    } else {
        addEmptyList()
    }
}

// Function to add task to local storage
function addTaskToLocalStorage(tasks, taskObj) {
    tasks.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Function to remove task from local storage when delete it
function removeTaskFromLocalStorage(tasks, task) {
    const index = getTaskIndex(tasks, task);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to make the task complated in local storage
function checkTaskInLocalStorage(tasks, task) {
    const index = getTaskIndex(tasks, task);
    tasks[index].checked = !tasks[index].checked;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get the index of task
function getTaskIndex(tasks, task) {
    let index;
    tasks.forEach((t, i) => {
        if(t.task === task.task) {
            index = i;
        }
    });
    return index;
}