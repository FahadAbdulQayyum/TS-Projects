import inquirer from "inquirer";
import chalk from "chalk";

let hr: number | string = 1;
let minn: number | string = 59;
let sec: number | string = 59;

async function main() {
  try {
    while (true) {
      let answers = await inquirer.prompt([
        {
          type: "input",
          name: "number1",
          message: "Enter the minutes:",
        },
      ]);
      if (answers.number1 === "x") {
        break;
      } else {
        countDown(+answers.number1);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function countDown(min: number) {
  hr = 0;
  minn = min;
  sec = 0;

  let timer = setInterval(() => {
    console.clear();

    // Add leading zeros if needed
    let displayHr = typeof hr === "number" && hr < 10 ? "0" + hr : hr;
    let displayMinn = typeof minn === "number" && minn < 10 ? "0" + minn : minn;
    let displaySec = typeof sec === "number" && sec < 10 ? "0" + sec : sec;

    console.log(displayHr + ":" + displayMinn + ":" + displaySec);

    if (sec === 0) {
      if (minn === 0) {
        if (hr === 0) {
          clearInterval(timer);
          console.log("Time's up!");
          return;
        } else {
          hr = +hr;
          hr--;
          minn = 59;
        }
      } else {
        minn = +minn;
        minn--;
      }
      sec = 59;
    } else {
      sec = +sec;
      sec--;
    }
  }, 1000); // Change the interval to 1000ms (1 second)
}

main();
