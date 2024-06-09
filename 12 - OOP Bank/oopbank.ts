import inquirer from "inquirer";
import chalk from "chalk";

class MyBank {
  constructor() {}
  async process(
    type: string = "input",
    name: string,
    message: string,
    choices?: string[]
  ): Promise<any> {
    let answers = await inquirer.prompt([
      { type: type, name, message, choices },
    ]);
    return answers[name];
  }
}
const myBank: MyBank = new MyBank();
const ans = await myBank.process(undefined, "username", "Enter your username");
console.log("ans::", ans);

const ansChoices = await myBank.process(
  "list",
  "username",
  "Enter your choices",
  ["Withdraw Amount", "Send Amount", "Balance Inquiry", "Password Change"]
);
console.log("ans::", ansChoices);
