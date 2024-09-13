import { createTasksFromLocalStorage } from "./scripts/localStorageScripts.js";
import { newTaskInput, storedTasks } from "./scripts/constants.js";
import { addEmptyList, clearComplatedTasks, addEventListenerToFilterButtons } from "./scripts/scriptsToUpdatePage.js";
import { addTask } from "./scripts/taskManagerScripts.js";


// Function to add tasks to task lists from local storage when domcument loaded
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tasks")) {
        createTasksFromLocalStorage(storedTasks());
    } else {
        addEmptyList();
    }
});

// Event listener for the new task input
newTaskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

//----------------------------------------------------------
// Edite App Functions
//----------------------------------------------------------

// Add event listener to show only active tasks
addEventListenerToFilterButtons(".app__filterbutton--acitve");

// Add event listener to show only complated tasks
addEventListenerToFilterButtons(".app__filterbutton--complated");

// Add event listener to show all tasks
addEventListenerToFilterButtons(".app__filterbutton--all");


// Add event listener to clear complated button
document.querySelector(".app__clearcomplated").addEventListener("click", () => {
    clearComplatedTasks(storedTasks());
});

// Function for toggle theme
function toggleTheme() {
    document.body.classList.toggle("dark");
}

// Add event listener to toggle theme
document.querySelector(".app__themebutton").addEventListener("click", () => {
    toggleTheme();
});

