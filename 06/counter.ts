import inquirer from "inquirer";
import chalk from "chalk";

class Counter {
  constructor() {}

  inpt = async (name: string, msg: string) => {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: name,
        message: msg,
      },
    ]);
    return answers;
  };
}

let counter = new Counter();
const res = await counter.inpt("inp", "Type your paragraph/sentence:");
let len = res.inp.split(" ");
let charLen = len
  .map((v: string) => v.length)
  .reduce((a: string, b: string) => +b + +a, 0);
console.log("Words Count:", len.length);
console.log("Char Count:", charLen);
