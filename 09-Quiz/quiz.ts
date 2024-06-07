import inquirer from "inquirer";
import chalk from "chalk";
import Quiz from "./quiz.json" assert { type: "json" };

async function main(
  type: string = "input",
  name: string,
  msg: string,
  choices?: string[]
): Promise<any> {
  let ans = await inquirer.prompt([
    { type, name, message: msg, choices: choices && choices },
  ]);
  return ans;
}

let quizes = Quiz;
let len = quizes.length;
let i = 0;
while (i < len) {
  let answerChoice = await main("list", "msgg", quizes[i].q1, quizes[i].ans);
  console.log(
    answerChoice.msgg === quizes[i].correct
      ? chalk.green("Congrats! You chose right answers.")
      : chalk.red(
          "Unfortunately! You chose a wrong answer. Right answer is:",
          chalk.white(quizes[i].correct)
        )
  );
  i++;
}
// let answerChoice = await main("list", "msgg", quizes[0].q1, quizes[0].ans);
// console.log(
//   "answer:",
//   answerChoice.msgg === quizes[0].correct ? "Congrats!" : "Unfortunately!"
// );
