{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false,
        })
    }

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            document.querySelector(".js-newTask").focus();
            return;
        }

        addNewTask(newTaskContent);

        document.querySelector(".js-newTask").value = "";
        document.querySelector(".js-newTask").focus();

        render();
    }

    const toggleTaskDone = (index) => {

        tasks[index].done = !tasks[index].done;
        render();
    }

    const bindEvents = () => {

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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class =\"taskListContainer__listItem\"">
                    <button class="js-done taskListContainer__doneButton">${task.done ? "✓" : ""}</button>
                    <span class="taskListContainer__taskContent${task.done ? " taskListContainer__taskContent--done" : ""}">${task.content}</span>
                    <button class="js-remove taskListContainer__doneButton taskListContainer__doneButton--removeButton">🗑</button>
                </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    };


    const init = () => {

        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();

}