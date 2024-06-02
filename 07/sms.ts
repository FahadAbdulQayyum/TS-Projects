import inquirer from "inquirer";
import chalk from "chalk";

class Counter {
  constructor() {}

  inpt = async (
    type: string = "input",
    name: string,
    msg: string,
    choices?: string[]
  ) => {
    const answers = await inquirer.prompt([
      {
        type: type,
        name: name,
        message: msg,
        choices: choices,
      },
    ]);
    return answers;
  };
}

let counter = new Counter();

// const res = await counter.inpt(
//   "option",
//   "Enter your choices:\n1. Enter Students Info.\n2. Enter Search Students Status.\n3. Get All Informations.\n\t"
// );

const res = await counter.inpt("list", "option", "Enter your choices:", [
  "Enter Students Info",
  "Look Students Information",
]);
console.log("res:::", res);

const ress = await counter.inpt(undefined, "option", "Enter your choices:");
console.log("ress:::", ress);
