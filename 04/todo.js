import inquirer from "inquirer";
import chalk from "chalk";
import todoJson from "./todo.json" assert { type: "json" };
// import * as fs from "fs";
// import * as path from "path";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
class Todo {
    constructor() {
        this.main = async (name, msg) => {
            const answers = await inquirer.prompt([
                { type: "input", name: name, message: msg },
            ]);
            return answers;
        };
    }
}
const todoInstance = new Todo();
// const res: { todo: string } = await todoInstance.main(
const res = await todoInstance.main("todo", "Enter your todo:");
// Convert import.meta.url to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, "todo.json");
const todos = todoJson;
// const data = fs.readFileSync(filePath, "utf8");
const data = readFileSync(filePath, "utf8");
console.log("dta", data);
if (res.todo) {
    todos.push({ todo: res.todo });
    console.log(chalk.green("Todo added successfully!"));
}
else {
    console.log(chalk.red("No todo entered."));
}
console.log(todos);
