import { taskList } from "./constants.js";
import { createTaskElement } from "./taskManagerScripts.js";
import { addEmptyList, updateLeftCount } from "./scriptsToUpdatePage.js";
//----------------------------------------------------------
// Local Storage Functions
//----------------------------------------------------------

// Function to create tasks from local storage
export function createTasksFromLocalStorage(tasks) {
    taskList.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((task) => {
            createTaskElement(task);
        });
        updateLeftCount(tasks);
    } else {
        addEmptyList();
    }
}

// Function to add task to local storage
export function addTaskToLocalStorage(tasks, taskObj) {
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove task from local storage when delete it
export function removeTaskFromLocalStorage(tasks, task) {
    const index = getTaskIndex(tasks, task);
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to make the task complated in local storage
export function checkTaskInLocalStorage(tasks, task) {
    const index = getTaskIndex(tasks, task);
    tasks[index].checked = !tasks[index].checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to get the index of task
export function getTaskIndex(tasks, task) {
    let index;
    tasks.forEach((t, i) => {
        if (t.task === task.task) {
            index = i;
        }
    });
    return index;
}
