import inquirer from "inquirer";
import Quiz from "./quiz.json" assert { type: "json" };
async function main(type = "input", name, msg, choices) {
    let ans = await inquirer.prompt([
        { type, name, message: msg, choices: choices && choices },
    ]);
    return ans;
}
// let answer = await main(undefined, "msg", "Enter your questions?");
// console.log("answer:", answer.msg);
let quizes = Quiz;
let answerChoice = await main("list", "msgg", quizes[0].q1, quizes[0].ans);
console.log("answer:", answerChoice.msgg === quizes[0].correct ? "Congrats!" : "Unfortunately!");
