{
    const tasks = [
        {
            content: "Zadanie pierwsze",
            done: true,
        },
        {
            content: "Zadanie drugie",
            done: false,
        },
        {
            content: "Zadanie trzecie",
            done: false,
        },
    ];

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
                <li class =\"listItem\"">
                <button class="js-done doneButton">${task.done ? "✓" : ""}</button>
                <span ${task.done ? " class =\"taskContent taskContent--done\"" : " class =\"taskContent\""}>${task.content}</span>
                <button class="js-remove removeButton">🗑</button>
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



















// ORYGINALNY KALKULATOR WALUT!
// {
//     const currencyElement = document.querySelector(".js-currency");
//     const resultCurrencyElement = document.querySelector(".js-resultCurrency");


//     const checkCurrencyPairRate = () => {

//         const currencyWorthEURPLN = 4.57;
//         const currencyWorthPLNEUR = 1 / currencyWorthEURPLN;

//         const currencyWorthUSDPLN = 3.77;
//         const currencyWorthPLNUSD = 1 / currencyWorthUSDPLN;

//         const currencyWorthEURUSD = 1.21;
//         const currencyWorthUSDEUR = 1 / currencyWorthEURUSD;

//         if (currencyElement.value === "PLN" && resultCurrencyElement.value === "EUR") {
//             return (currencyWorthPLNEUR);

//         } else if (currencyElement.value === "EUR" && resultCurrencyElement.value === "PLN") {
//             return (currencyWorthEURPLN);

//         } else if (currencyElement.value === "PLN" && resultCurrencyElement.value === "USD") {
//             return (currencyWorthPLNUSD);

//         } else if (currencyElement.value === "EUR" && resultCurrencyElement.value === "USD") {
//             return (currencyWorthEURUSD);

//         } else if (currencyElement.value === "USD" && resultCurrencyElement.value === "PLN") {
//             return (currencyWorthUSDPLN);

//         } else if (currencyElement.value === "USD" && resultCurrencyElement.value === "EUR") {
//             return (currencyWorthUSDEUR);

//         } else if (currencyElement.value === resultCurrencyElement.value) {
//             currencyElement.classList.add("form__selectField--error");
//             resultCurrencyElement.classList.add("form__selectField--error");
//         }
//         else {
//             console.log("error");
//         }
//     }

//     const calculateResult = () => {
//         const amountElement = document.querySelector(".js-amount");
//         return (amountElement.value * checkCurrencyPairRate()).toFixed(2);

//     }

//     const removeErrors = () => {
//         currencyElement.classList.remove("form__selectField--error");
//         resultCurrencyElement.classList.remove("form__selectField--error");
//     }


//     const init = () => {

//         const formElement = document.querySelector(".js-form");
//         const resultElement = document.querySelector(".js-result");

//         formElement.addEventListener("submit", (event) => {
//             event.preventDefault();
//             removeErrors();
//             resultElement.value = calculateResult();
//         })
//     }

//     init();
// }