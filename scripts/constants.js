export const taskList = document.querySelector(".app__tasks");
export const newTaskInput = document.getElementById("newtask");
export const storedTasks = () => {
    if (localStorage.getItem("tasks")) {
        return JSON.parse(localStorage.getItem("tasks"));
    } else {
        return [];
    }
};
