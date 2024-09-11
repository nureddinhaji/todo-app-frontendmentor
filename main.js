
const newTaskInput = document.getElementById('newtask');
const taskList = document.querySelector('.app__tasks');

// Function to add the task from new task input to the task list
function addTask() {
    const newTask = newTaskInput.value;
    createTaskElement(newTask);
}
// Function to create the task element
function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('app__task');

    const taskElementHtml = `<button class="app__taskcheck"><img src="./images/icon-check.svg"/></button>
    <input type="text" class="app__input" value="${task}" disabled>
    <button class="app__taskdelete"><img src="./images/icon-cross.svg"/></button>`;
    
    let fragment = document.createRange().createContextualFragment(taskElementHtml);

    fragment.querySelector(".app__taskdelete").addEventListener("click", () => {
            console.log("clicked");
            deleteTask(taskElement);
        });

    fragment.querySelector(".app__taskcheck").addEventListener("click", () => {
            checkTask(taskElement);
        });

    taskElement.appendChild(fragment);
    taskList.insertAdjacentElement("afterbegin", taskElement);
}

// Event listener for the new task input
newTaskInput.addEventListener(("keydown"), (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Function for delete the task
function deleteTask(task) {
    console.log(task)
    task.remove();
}

// Function to check the task and make it complated
function checkTask(task) {
    task.classList.toggle("app__task--complated");
}

