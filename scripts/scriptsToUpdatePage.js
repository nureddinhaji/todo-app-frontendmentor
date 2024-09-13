import { taskList } from "./constants.js";
import { createTasksFromLocalStorage } from "./localStorageScripts.js";

// Function to update lefted tasks count from checked tasks
export function updateLeftCount(tasks) {
    const leftCount = document.querySelector(".app__leftcount");
    const checkedTasks = tasks.filter((task) => task.checked);
    leftCount.textContent = `${tasks.length - checkedTasks.length} items left`;
}


// Function to add empty list when there are no tasks
export function addEmptyList() {
    if (document.querySelector(".app__tasks-empty")) {
        return;
    }
    const emptyListHtml = `<div class="app__tasks-empty"><p class="app__tasks-emptytext">There are no tasks</p><img src="./images/illustration-empty.svg" alt="empty list" class="app__tasks-emptyimage"></div>`;
    taskList.insertAdjacentHTML("afterbegin", emptyListHtml);
}

// Function to clear complated tasks
export function clearComplatedTasks(tasks) {
    const unComplatedTasks = tasks.filter((task) => !task.checked);
    localStorage.setItem("tasks", JSON.stringify(unComplatedTasks));
    createTasksFromLocalStorage(unComplatedTasks);
}

// Function to select actived filter
function selectActiveFilter(element) {
    document
        .querySelector(".app__filterbutton--activeted")
        .classList.remove("app__filterbutton--activeted");
    element.classList.add("app__filterbutton--activeted");
}

// Function to add event listener to all filter buttons
export function addEventListenerToFilterButtons(buttonClass) {
    document.querySelector(buttonClass).addEventListener("click", () => {
        taskList.className = `app__tasks${
            buttonClass == ".app__filterbutton--acitve"
                ? " app__tasks--active"
                : buttonClass == ".app__filterbutton--complated"
                ? " app__tasks--complated"
                : ""
        }`;
        selectActiveFilter(document.querySelector(buttonClass));
    });
};