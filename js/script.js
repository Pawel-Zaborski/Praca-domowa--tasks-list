{
  const tasks = [
    {
      content: "Nagrać lekcję",
      done: false,
    },
    {
      content: "zjesć pierogi",
      done: true,
    },
  ];

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
          <li${tasks.done ? ' style="text-decoration: line through"' : ""}>
            ${task.content}
          </li>        
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const init = () => {
    render();
  };

  init();
}
