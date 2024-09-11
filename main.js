
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
    taskElement.innerHTML = `<button class="app__taskcheck" disabled><img src="./images/icon-check.svg"/></button>
    <input type="text" name="newtask" id="newtask" class="app__newtask app__input" value="${task}" disabled>
    <button class="app__taskdelete" disabled><img src="./images/icon-cross.svg"/></button>`;
    taskList.insertAdjacentElement("afterbegin", taskElement)
}

// Event listener for the new task input
newTaskInput.addEventListener(("keydown"), (e) => {
    if (e.key === "Enter") {
        addTask();
    }
})