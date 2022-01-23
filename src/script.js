const timeframeBtns = document.querySelectorAll(".timeframe");
const titles = document.querySelectorAll(".title");
const currentTime = document.querySelectorAll(".current-time");
const previousTime = document.querySelectorAll(".previous-time");

timeframeBtns.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active state for inactive buttons
    timeframeBtns.forEach((inactiveButton) => {
      inactiveButton.classList.remove("active");
      inactiveButton.classList.remove("text-white");
      inactiveButton.classList.add("text-[#7078C9]");
    });

    // Add active state if the button clicked is not yet active
    button.classList.add("active");
    button.classList.remove("text-[#7078C9]");
    button.classList.add("text-white");

    // Fetch data from the provided JSON file
    fetch("./data.json")
      .then((response) => response.json())
      .then((data, index) => {
        // Loop through each data object using their respective index
        for (index = 0; index < data.length; index++) {
          titles.forEach((title) => {
            // Check each title in the HTML if they are similar with the respective JSON object title
            if (title.innerText === data[index].title) {
              for (let i = 0; i < currentTime.length; i++) {
                // Check if the index of the JSON data object is the same as the respective title in the HTML
                if (index === i) {
                  if (
                    data[index].timeframes[button.innerText.toLowerCase()]
                      .current <= 1
                  ) {
                    currentTime[i].innerText = `${
                      data[index].timeframes[button.innerText.toLowerCase()]
                        .current
                    }hr`;
                  } else {
                    currentTime[i].innerText = `${
                      data[index].timeframes[button.innerText.toLowerCase()]
                        .current
                    }hrs`;
                  }
                }
              }

              for (let j = 0; j < previousTime.length; j++) {
                // Check if the index of the JSON data object is the same as the respective title in the HTML
                if (index === j) {
                  let previousTimeText;
                  if (button.innerText === "Daily") {
                    previousTimeText = "Day";
                  } else if (button.innerText === "Weekly") {
                    previousTimeText = "Week";
                  } else {
                    previousTimeText = "Month";
                  }

                  if (
                    data[index].timeframes[button.innerText.toLowerCase()]
                      .previous <= 1
                  ) {
                    previousTime[j].innerText = `Last ${previousTimeText} - ${
                      data[index].timeframes[button.innerText.toLowerCase()]
                        .previous
                    }hr`;
                  } else {
                    previousTime[j].innerText = `Last ${previousTimeText} - ${
                      data[index].timeframes[button.innerText.toLowerCase()]
                        .previous
                    }hrs`;
                  }
                }
              }
            }
          });
        }
      });
  });
});
