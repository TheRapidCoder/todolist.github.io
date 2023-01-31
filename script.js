const taskName = document.querySelector("#task-name");
const addTaskBtn = document.querySelector("#add-task-btn");
const taskItemUl = document.querySelector("#task-item");
const removeAllTasks = document.querySelector("#remove-task");
const showMessage = document.querySelector("#show-message");
const alertMessage = document.getElementById("alert-message");

let taskList = [];

// show alert message
showAlert = (message) => {
  showMessage.style.display = "block";
  alertMessage.innerText = message;
  setTimeout(() => {
    showMessage.style.display = "none";
  }, 1000);
};

// create local storage if it's not created

if (localStorage.getItem("toDoList") == null) {
  // console.log("Local Storage is created");
  localStorage.setItem("toDoList", JSON.stringify(taskList));
}

//remove all task

removeAllTasks.addEventListener("click", () => {
  localStorage.removeItem("toDoList");
  location.reload();
});

//render task function
function renderTasks(tasks) {
  taskItemUl.innerHTML = "";
  tasks.forEach((item) => {
    const li = document.createElement("li");
    li.setAttribute("id", item.id);
    li.innerHTML = `
    <div class="task-title"><div class="mark-done" title="Mark as done"><i class="fa-solid fa-check tick"></i></div>
    <h2 class="task-name">${item.taskName}</h2></div>
    <div class='btn-container'>
    <button class="edit btn2">Edit</button>
    <button class="delete btn2">Remove</button></div>`;
    taskItemUl.append(li);
    if (item.isDone == true) {
      const markDone = li.querySelector(".mark-done .tick");
      markDone.style.display = "block";
      const title = li.querySelector("h2");
      title.style.textDecoration = "line-through";
      li.style.color = "rgb(60, 239, 60)";
    }
  });
}

// display tasks
taskList = JSON.parse(localStorage.getItem("toDoList"));
renderTasks(taskList);

// add event listener to add-task button
addTaskBtn.addEventListener("click", () => {
  //if task name and task description is empty then Don't create a task
  if (taskName.value.trim() == "") {
    // alert("Please add task name");
    showAlert("Please enter task to add");
    return;
  }
  // create a task
  const task = {
    taskName: taskName.value,
    isDone: false,
    // id: new Date(),
    id: Date.now(),
  };

  //add task to taskList
  taskList = JSON.parse(localStorage.getItem("toDoList"));
  taskList.push(task);

  //add task to localStorage
  localStorage.setItem("toDoList", JSON.stringify(taskList));

  // render task to page
  taskList = JSON.parse(localStorage.getItem("toDoList"));
  // location.reload();
  renderTasks(taskList);

  taskName.value = "";
});

//=========================================edit task==================================

const editTaskBox = document.querySelector(".edit-task");
const editTaskName = document.querySelector("#edit-task-name");
const saveTaskBtn = document.querySelector("#save-task-btn");

function saveEditedTask(index) {
  taskList = JSON.parse(localStorage.getItem("toDoList"));

  saveTaskBtn.addEventListener(
    "click",
    function () {
      //check new task name is empty or not. 
      if(editTaskName.value.trim()==''){
        updatedTaskName=taskList[index].taskName
      }else{
        updatedTaskName=editTaskName.value;
      }
      taskList[index].taskName = updatedTaskName;
      editTaskBox.style.display = "none";
      localStorage.setItem("toDoList", JSON.stringify(taskList));
      renderTasks(taskList);
      editTaskName.value = "";
    },
    { once: true }
  );
}
taskItemUl.addEventListener("click", (e) => {
  // taskList = JSON.parse(localStorage.getItem("toDoList"));

  if (e.target.classList.contains("edit")) {
    editTaskBox.style.display = "block";
    for (i = 0; i < taskList.length; i++) {
      const id = e.target.parentElement.parentElement.getAttribute("id");

      if (taskList[i].id == id) {
        console.log(e.target);
        saveEditedTask(i);
      }
    }
  }
});

//delete task
taskItemUl.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.parentElement.parentElement.getAttribute("id");
    deleteTask(id);
  }
});

function deleteTask(id) {
  taskList = JSON.parse(localStorage.getItem("toDoList"));
  for (i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      localStorage.setItem("toDoList", JSON.stringify(taskList));
      break;
    }
  }
  renderTasks(taskList);
}

//mark task as done
taskItemUl.addEventListener("click", (e) => {
  if (e.target.className == "mark-done") {
    const id = e.target.parentElement.parentElement.getAttribute("id");
    taskList = JSON.parse(localStorage.getItem("toDoList"));
    for (i = 0; i < taskList.length; i++) {
      if (taskList[i].id == id) {
        taskList[i].isDone = true;
        localStorage.setItem("toDoList", JSON.stringify(taskList));
        break;
      }
    }
    renderTasks(taskList);
  }
});
