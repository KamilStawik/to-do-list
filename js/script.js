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
        tasks = tasks.map((task) => ({
            ...task, done: true,
        }));
        render();
    }

    const checkIfAllTasksAreDone = () => {
        const tasksUndone = tasks.filter(task => task.done === false)
        if (tasksUndone.length > 0) {
            return false;
        } else {
            return true;
        }
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
        tasks[index].done === false ? newDoneValue = true : newDoneValue = false;

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
        }

        const allTasksDoneButton = document.querySelector(".js-allTasksDoneButton");

        if (allTasksDoneButton !== null) {
            allTasksDoneButton.addEventListener("click", () => {
                markAllTasksDone();
            });
        }
    }

    const renderButtons = () => {
        let htmlString = "";

        if (tasks.length > 0) {

            htmlString += `
                <button class =\"taskList__topButton js-hideDoneButton\">${hideDoneTasks === false ? "Ukryj ukończone" : "Pokaż ukończone"}</button>
                <button class =\"taskList__topButton js-allTasksDoneButton\" ${checkIfAllTasksAreDone() === true ? "disabled" : ""}>Ukończ wszystkie</button>
        `;
        }

        document.querySelector(".js-topButtons").innerHTML = htmlString;
        bindTopButtonsEvents();
    }

    const renderTaskList = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class =\"taskList__listItem${task.done && hideDoneTasks ? " taskList__listItem--hiden" : ""}">
                    <button class="js-done taskList__button">${task.done ? "✓" : ""}</button>
                    <span class="taskList__taskContent${task.done ? " taskList__taskContent--done" : ""}">${task.content}</span>
                    <button class="js-remove taskList__button taskList__button--removeButton">🗑</button>
                </li>
            `;
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