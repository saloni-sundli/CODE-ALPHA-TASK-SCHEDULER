  // api.js
  const TASKS_STORAGE_KEY = 'tasks';

  document.addEventListener('DOMContentLoaded', getAllTasks);

  function createTask(taskData) {
    try {
      // Retrieve existing tasks from local storage
      const existingTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) || [];

      // Add the new task to the array
      existingTasks.push(taskData);

      // Save the updated tasks array to local storage
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(existingTasks));

      console.log('Task created successfully.');
      return true;
    } catch (error) {
      console.error('Error creating task:', error);
      return false;
    }
  }

// ... (previous code)

// ... (previous code)

function getAllTasks() {
  try {
    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) || [];
    console.log('All tasks:', tasks);

    const list = document.getElementById('list');

    tasks.forEach((task) => {
      const dateTime = dateFormat(task.dueDate);

      const li = document.createElement('li');
      li.innerHTML = `
        <div class="head">
            <h3>${task.title}</h3>
            <button class="delete-button">
                <img src="./trash.svg" alt="">
            </button>
        </div>
        <p class="date-time">Due Date: ${dateTime}</p>
        <p>${task.description}</p>
      `;

      li.dataset.id = task._id;

      // Add event listener to the delete button
      const deleteButton = li.querySelector('.delete-button');
      deleteButton.addEventListener('click', () => {
        deleteTask(task._id);
        // Remove the task from the DOM
        li.remove();
      });

      list.appendChild(li);

      // Check if the task's due date is equal to the current time
      const currentDateTime = new Date();
    const taskDueDate = new Date(task.dueDate); 

      if (taskDueDate.getTime() <= currentDateTime.getTime()) {
        // Show an alert
        alert(`Task "${task.title}" is due now!`);
        // Delete the task
        deleteTask(task._id);
        // Remove the task from the DOM
        li.remove();
      }
    });

    return tasks;
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    return [];
  }
}

// ... (previous code)

// ... (previous code)

function checkAndDeleteDueTasks() {
  const tasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) || [];
  const currentDateTime = new Date();

  tasks.forEach((task) => {
    const taskDueDate = new Date(task.dueDate); 
    if (taskDueDate.getTime() <= currentDateTime.getTime()) {
      alert(`Task "${task.title}" is due now!`);
      deleteTask(task._id);
      updateTasksList(); // Update the tasks list in the DOM
    }
  });
}

setInterval(checkAndDeleteDueTasks, 1000); // Check every second

// ... (remaining code)

function updateTasksList() {
  const list = document.getElementById('list');
  list.innerHTML = ''; // Clear the existing list

  getAllTasks(); // Re-populate the tasks list
}

// ... (remaining code)

  function deleteTask(taskId) {
    try {
      // Retrieve existing tasks from local storage
      const existingTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) || [];

      // Filter out the task with the specified taskId
      const updatedTasks = existingTasks.filter((task) => task._id !== taskId);

      // Save the updated tasks array to local storage
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));

      console.log('Task deleted successfully.');
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  }

  // ... (remaining code)
  // ... (remaining code)

  // Constants
  const addTaskForm = document.getElementById('add-task-form');

  addTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('task-due-date').value;
    const dueTime = document.getElementById('task-due-time').value;

    if (!title || !description || !dueDate || !dueTime) {
      alert('Please fill in all the fields.');
      return;
    }

    const dateTimeString = `${dueDate}T${dueTime}`;
    const dueDateTime = new Date(dateTimeString);
  
    // Check if dueDateTime is earlier than the current date and time
    const currentDateTime = new Date();
    if (dueDateTime < currentDateTime) {
      alert('Warning: Due date must be later than the current date and time.');
      return;
    }

    const taskData = {
      _id: generateUniqueId(), // Replace this with your actual unique ID generation logic
      title,
      description,
      dueDate: dueDateTime,
    };

    const taskCreated = createTask(taskData);

    if (taskCreated) {
      reloadPage();
    }

    addTaskForm.reset();
  });

  // Function to generate a unique ID (replace this with your actual logic)
  function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  // ... (other event listeners and functions)

  function reloadPage() {
    window.location.reload();
  }

  function dateFormat(inputDate) {
    // Parse the input date string to create a Date object
    const date = new Date(inputDate);

    // Format the date and time components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Create the formatted date and time string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    return formattedDate;
  }
