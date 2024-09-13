import { getTaskIndex } from "./localStorageScripts.js";
import { createTasksFromLocalStorage } from "./localStorageScripts.js";
import { storedTasks } from "./constants.js";

//----------------------------------------------------------
// Function for add drag and drop eventlistener
//----------------------------------------------------------

let draggedElement = null;
let draggedTask = null;
export function addDragAndDrop(taskElement, task) {

    taskElement.addEventListener("dragstart", (e) => {
        draggedElement = taskElement;
        draggedTask = task;
        setTimeout(() => {
            taskElement.classList.add("app__task--dragging");
        }, 0);
    });

    taskElement.addEventListener("dragend", (e) => {
        setTimeout(() => {
            taskElement.classList.remove("app__task--dragging");
            draggedElement = null;
            draggedTask = null;
        }, 0);
    });

    taskElement.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    taskElement.addEventListener("drop", (e) => {
        e.preventDefault();
        if (taskElement !== draggedElement && draggedElement) {
            let tasks = storedTasks();
            let droppedTask = task;
            swapTasksInLocalStorage(tasks, draggedTask, droppedTask);
            createTasksFromLocalStorage(tasks);
        }
    });
}


// Helper function to swap tasks in localStorage
function swapTasksInLocalStorage(tasks, draggedTask, droppedTask) {
    const draggedTaskIndex = getTaskIndex(tasks, draggedTask);
    const droppedTaskIndex = getTaskIndex(tasks, droppedTask);
    
    [tasks[draggedTaskIndex], tasks[droppedTaskIndex]] = [tasks[droppedTaskIndex], tasks[draggedTaskIndex]];

    localStorage.setItem("tasks", JSON.stringify(tasks));
}