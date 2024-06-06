import inquirer from "inquirer";
async function main(type = "input", name, msg, choices) {
    let ans = await inquirer.prompt([
        { type, name, message: msg, choices: choices && choices },
    ]);
    return ans;
}
let answer = await main(undefined, "msg", "Enter your questions?");
console.log("answer:", answer.msg);
let answerChoice = await main("list", "msgg", "Enter your Options?", [
    "1st",
    "2nd",
    "Third",
    "Fourth",
]);
console.log("answer:", answerChoice.msgg);
