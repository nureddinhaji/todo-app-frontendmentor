import { newTaskInput, storedTasks, taskList } from "./constants.js";
import { addDragAndDrop } from "./dragAndDropScripts.js";
import { addTaskToLocalStorage, checkTaskInLocalStorage, createTasksFromLocalStorage, removeTaskFromLocalStorage } from "./localStorageScripts.js";
import { updateLeftCount } from "./scriptsToUpdatePage.js";

// Function to add the task from new task input to the task list
export function addTask() {
    const newTask = newTaskInput.value;
    if(newTask === "") return
    const newTaskObj = { task: newTask, checked: false };
    addTaskToLocalStorage(storedTasks(), newTaskObj);
    createTaskElement(newTaskObj);
    updateLeftCount(storedTasks());
    newTaskInput.value = "";
}

// Function to create the task element
export function createTaskElement(task) {
    const emptyList = document.querySelector(".app__tasks-empty");
    if (emptyList) {
        emptyList.remove();
    }
    const taskElement = document.createElement("div");
    taskElement.classList.add("app__task");
    if (task.checked) {
        taskElement.classList.add("app__task--complated");
    }
    taskElement.setAttribute("draggable", "true")

    const taskElementHtml = `<button class="app__taskcheck"><img src="./images/icon-check.svg"/></button>
    <input type="text" class="app__input" value="${task.task}" disabled>
    <button class="app__taskdelete"><img src="./images/icon-cross.svg"/></button>`;

    let fragment = document
        .createRange()
        .createContextualFragment(taskElementHtml);

    fragment.querySelector(".app__taskdelete").addEventListener("click", () => {
        deleteTask(storedTasks(), task);
    });

    fragment.querySelector(".app__taskcheck").addEventListener("click", () => {
        checkTask(storedTasks(), task);
    });
    addDragAndDrop(taskElement, task);

    taskElement.appendChild(fragment);
    taskList.insertAdjacentElement("afterbegin", taskElement);
}


// Function for delete the task
function deleteTask(tasks, task) {
    removeTaskFromLocalStorage(tasks, task);
    createTasksFromLocalStorage(tasks);
}

// Function to check the task and make it complated
function checkTask(tasks, task) {
    checkTaskInLocalStorage(tasks, task);
    createTasksFromLocalStorage(tasks);
}