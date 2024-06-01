import inquirer from "inquirer";
import chalk from "chalk";
import data from "./data.json" assert { type: "json" };
class ATM {
    constructor() {
        this.main = async (name, msg) => {
            const answers = await inquirer.prompt([
                { type: "input", name: name, message: msg },
            ]);
            return answers;
        };
    }
}
const atm = new ATM();
const res = await atm.main("num1", "Enter your name:");
const { num1 } = res;
let result = data.find((d) => d.name.toLowerCase() === num1.toLowerCase());
console.log("result||", result);
if (result) {
    const atm = new ATM();
    const res = await atm.main("pin", "Enter your pin:");
    const { pin } = res;
    if (result.pin === pin) {
        console.log(chalk.yellow("Welcome to DUDE Bank!"));
    }
    else {
        console.log(chalk.red("Sorry, Wrong Pin!"));
    }
}
else {
    console.log(chalk.red("Sorry, Wrong ATM!"));
}
console.log("res::", res, "result::", result);
