window.onload = function() {
    openNav(); // 초기에 사이드바가 열려있도록 설정
}

function toggleNav() {
    const sidenav = document.getElementById("mySidenav");
    const isOpen = sidenav.style.width === "250px";

    if (isOpen) {
        closeNav();
    } else {
        openNav();
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.marginLeft = "50px";
}












/*
document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.querySelector('.add-task');
    
    addTaskButton.addEventListener('click', function() {
        const taskList = document.querySelector('.task-list');
        const newTask = document.createElement('li');
        newTask.className = 'task pending';
        newTask.textContent = '새로운 목표 추가';
        taskList.appendChild(newTask);
    });
});
*/

document.addEventListener('DOMContentLoaded', function() {
    var addTaskButton = document.getElementById('addTaskButton');
    var taskPopup = document.getElementById('taskPopup');
    var closeButton = document.querySelector('.popup .close');
    var cancelTaskButton = document.getElementById('cancelTaskButton');
    var taskForm = document.getElementById('taskForm');
    var taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', function() {
        // Show popup for creating a new task
        taskForm.reset();
        taskPopup.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        taskPopup.style.display = 'none';
    });

    cancelTaskButton.addEventListener('click', function() {
        taskPopup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == taskPopup) {
            taskPopup.style.display = 'none';
        }
    });

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var taskContent = document.getElementById('task').value;

        // Create new task item in the list
        var newTaskItem = document.createElement('li');
        newTaskItem.classList.add('task', 'pending');
        newTaskItem.textContent = taskContent;

        taskList.appendChild(newTaskItem);

        // Hide popup
        taskPopup.style.display = 'none';
    });
});
