{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false }
        ];
    }

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    }

    const markAllTasksDone = () => {
        tasks.forEach(task => { task.done = true });
        render();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent === "") {
            newTaskElement.focus();
            return;
        }

        addNewTask(newTaskContent);

        newTaskElement.value = "";
        newTaskElement.focus();

        render();
    }

    const toggleTaskDone = (index) => {

        if (tasks[index].done === false) {
            newDoneValue = true;
        } else {
            newDoneValue = false;
        }

        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: newDoneValue },
            ...tasks.slice(index + 1),
        ];
        render();
    }

    const bindTaskListEvents = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const bindTopButtonsEvents = () => {

        const hideDoneButton = document.querySelector(".js-hideDoneButton");

        if (hideDoneButton !== null) {
            hideDoneButton.addEventListener("click", () => {
                hideDoneTasks = !hideDoneTasks;
                render();
            });
        } else {
            console.log("nie ma buttonów");
        }

        const allTasksDoneButton = document.querySelector(".js-allTasksDoneButton");

        if (allTasksDoneButton !== null) {
            allTasksDoneButton.addEventListener("click", () => {
                markAllTasksDone();
            });
        } else {
            console.log("nie ma buttonów");
        }
    }

    const renderButtons = () => {
        let htmlString = "";

        if (tasks.length > 0) {

            console.log("tablica zawiera obiekty")

            htmlString += `
                <button class =\"taskList__topButton js-hideDoneButton\"">Ukryj ukończone</button>
                <button class =\"taskList__topButton js-allTasksDoneButton\"">Ukończ wszystkie</button>
        `;
        } else {
            console.log("tablica jest pusta")
        }
        document.querySelector(".js-topButtons").innerHTML = htmlString;
        bindTopButtonsEvents();
    }


    const renderTaskList = () => {
        let htmlString = "";

        for (const task of tasks) {
            if (hideDoneTasks === false) {
                htmlString += `
                <li class =\"taskList__listItem\"">
                    <button class="js-done taskList__button">${task.done ? "✓" : ""}</button>
                    <span class="taskList__taskContent${task.done ? " taskList__taskContent--done" : ""}">${task.content}</span>
                    <button class="js-remove taskList__button taskList__button--removeButton">🗑</button>
                </li>
            `;
            } else {
                htmlString += `
                <li class =\"taskList__listItem${task.done ? " taskList__listItem--hiden" : ""}">
                    <button class="js-done taskList__button">${task.done ? "✓" : ""}</button>
                    <span class="taskList__taskContent${task.done ? " taskList__taskContent--done" : ""}">${task.content}</span>
                    <button class="js-remove taskList__button taskList__button--removeButton">🗑</button>
                </li>
            `;
            }
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindTaskListEvents();
    };

    const render = () => {
        renderTaskList();
        renderButtons();
    }

    const init = () => {

        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();

}