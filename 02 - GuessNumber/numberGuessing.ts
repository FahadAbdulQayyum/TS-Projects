import inquirer from "inquirer";
import chalk from "chalk";

async function main() {
  try {
    while (1) {
      let answers = await inquirer.prompt([
        {
          type: "input",
          name: "number1",
          message: "Guess your number between 1 to 10:",
        },
      ]);
      if (answers.number1 === "x") {
        break;
      } else {
        console.clear();
        console.log("Press x to exit!");
        compare(answers.number1);
      }
    }
  } catch (error) {}
}

const compare = (num: number | string) => {
  let randNum = Math.random() * 10;
  randNum = +randNum.toFixed(0);
  num = +num;
  if (randNum < num) {
    console.log(chalk.redBright("You guessed a higher number."), num, randNum);
  } else if (randNum > num) {
    console.log(chalk.redBright("You guessed a lower number."), num, randNum);
  } else {
    console.log(
      chalk.greenBright(
        "Congratulation! You guessed right number.",
        num,
        randNum
      )
    );
  }
};
main();
