{
  let tasks = [];
  let showCompleted = true;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent, done: false }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = tasks.filter((_, index) => index !== taskIndex);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const toggleShowCompleted = () => {
    showCompleted = !showCompleted;
    render();
  };

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

    const markAllDoneButton = document.querySelector(".js-markAllDone");
    markAllDoneButton.addEventListener("click", () => {
      markAllTasksDone();
      markAllDoneButton.disabled = true; // Wyłącza przycisk po naciśnięciu
    });

    const toggleShowCompletedButton = document.querySelector(
      ".js-toggleShowCompleted"
    );
    toggleShowCompletedButton.addEventListener("click", toggleShowCompleted);
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      if (showCompleted || !task.done) {
        htmlString += `
         <li class="container__list">
                    <button class="js-done"></button>
                    <span style="text-decoration: ${
                      task.done ? "line-through" : "none"
                    }">
                        ${task.content}
                    </span>
                    <button class="js-remove"></button>
                </li>
                <hr>
        `;
      }
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    const toggleShowCompletedButton = document.querySelector(
      ".js-toggleShowCompleted"
    );
    toggleShowCompletedButton.textContent = showCompleted
      ? "Ukryj ukończone"
      : "Pokaż ukończone";

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
    document.querySelector(".js-newTask").value = ""; // Czyszczenie pola po dodaniu zadania
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
