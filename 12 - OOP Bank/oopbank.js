import inquirer from "inquirer";
class MyBank {
    constructor() { }
    async process(type = "input", name, message, choices) {
        let answers = await inquirer.prompt([
            { type: type, name, message, choices },
        ]);
        return answers[name];
    }
}
const myBank = new MyBank();
const ans = await myBank.process(undefined, "username", "Enter your username");
console.log("ans::", ans);
const ansChoices = await myBank.process("list", "username", "Enter your choices", ["Withdraw Amount", "Send Amount", "Balance Inquiry", "Password Change"]);
console.log("ans::", ansChoices);
