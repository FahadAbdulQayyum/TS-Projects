import inquirer from "inquirer";
import chalk from "chalk";

type GuessNumber = number;
async function main() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "number1",
        message: "Guess your number between 1 to 10:",
      },
    ]);
    compare(answers.number1);
  } catch (error) {}
}

const compare = (num: number | string) => {
  let randNum = Math.random() * 10;
  randNum = +randNum.toFixed(0);
  num = +num;
  // if (randNum < parseFloat(num)) {
  if (randNum < num) {
    console.log(
      chalk.bgCyanBright("You guessed a higher number."),
      num,
      randNum
    );
    // } else if (randNum > parseFloat(num)) {
  } else if (randNum > num) {
    console.log(
      chalk.bgCyanBright("You guessed a lower number."),
      num,
      randNum
    );
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
