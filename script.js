// Get the form and task list from the HTML
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");


// Get the statistics elements
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");


// Load saved tasks from the browser
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];


// Display tasks when the website opens
displayTasks();


// When the form is submitted
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get information entered by the user
    const taskName = document.getElementById("taskName").value;
    const subject = document.getElementById("subject").value;
    const deadline = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;


    // Create a new task
    const newTask = {
        id: Date.now(),
        name: taskName,
        subject: subject,
        deadline: deadline,
        priority: priority,
        completed: false
    };


    // Add the task to the array
    tasks.push(newTask);


    // Save tasks in the browser
    saveTasks();


    // Display the updated list
    displayTasks();


    // Clear the form
    taskForm.reset();

});


// Function to display tasks
function displayTasks() {

    taskList.innerHTML = "";


    if (tasks.length === 0) {

        taskList.innerHTML =
            "<p>No study tasks added yet. Add your first task above!</p>";

    }


    tasks.forEach(function(task) {

        const taskCard = document.createElement("div");

        taskCard.className =
            `task-card ${task.priority.toLowerCase()} 
            ${task.completed ? "completed" : ""}`;


        taskCard.innerHTML = `

            <h3>${task.name}</h3>

            <p><strong>Subject:</strong> ${task.subject}</p>

            <p><strong>Deadline:</strong> ${task.deadline}</p>

            <p><strong>Priority:</strong> ${task.priority}</p>

            <div class="task-buttons">

                <button
                    class="complete-btn"
                    onclick="completeTask(${task.id})">
                    ${task.completed ? "Undo" : "Mark Complete"}
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>
        `;


        taskList.appendChild(taskCard);

    });


    updateStatistics();
}


// Mark a task as completed
function completeTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    saveTasks();
    displayTasks();
}


// Delete a task
function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });

    saveTasks();
    displayTasks();
}


// Save tasks in browser storage
function saveTasks() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

}


// Update statistics
function updateStatistics() {

    const total = tasks.length;

    const completed =
        tasks.filter(function(task) {
            return task.completed;
        }).length;

    const pending = total - completed;


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

}