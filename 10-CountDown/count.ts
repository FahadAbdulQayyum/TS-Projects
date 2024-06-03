import inquirer from "inquirer";
import chalk from "chalk";

async function main() {
  // try {
  //   while (1) {
  //     let answers = await inquirer.prompt([
  //       {
  //         type: "input",
  //         name: "number1",
  //         message: "Guess your number between 1 to 10:",
  //       },
  //     ]);
  //     if (answers.number1 === "x") {
  //       break;
  //     } else {
  countDown();
  //       }
  //     }
  //   } catch (error) {}
}
function countDown() {
  setInterval(() => {
    console.clear();
    let date = new Date();
    let sec: number | string = 0;
    if (date.getSeconds() < 10) {
      sec = "0" + date.getSeconds();
    } else {
      sec = date.getSeconds();
    }
    console.log(
      chalk.black(
        // date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        date.getHours() + ":" + date.getMinutes() + ":" + sec
      )
    );
  }, 1000);
}
main();
