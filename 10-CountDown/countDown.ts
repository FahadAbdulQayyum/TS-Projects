import inquirer from "inquirer";
import chalk from "chalk";

let sec: number | string = 0;
let min: number | string = 0;
let hr: number | string = 0;

async function main() {
  try {
    while (1) {
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
  } catch (error) {}
}

function countDown(min: number) {
  setInterval(() => {
    console.clear();
    // if (sec === 0 || sec === "0") {
    //   console.log("***");
    //   sec = "00";
    // }
    if (typeof sec === "number" && sec < 10) {
      // typeof sec === "number" && sec++;
      sec = "0" + sec;
    }
    if (sec === "60" || sec === 60) {
      sec = 0;
      if (sec === 0) {
        sec = "00";
      }
      //   min++;
      //   if (min < 10) {
      //     min = "0" + min;
      //   }
    }
    console.log(sec + ":");
    sec = Number(sec);
    typeof sec === "number" && sec++;
  }, 1000);
}
main();
