import inquirer from "inquirer";
import chalk from "chalk";
import todoJson from "./todo.json" assert { type: "json" };
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
const res = await todoInstance.main("todo", "Enter your todo:");
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, "todo.json");
const todos = todoJson;
if (res.todo) {
    let data = readFileSync(filePath, "utf8");
    data = JSON.parse(data);
    console.log("dta", data);
    //   todos.push({ todo: res.todo });
    //   data.push({ todo: res.todo });
    //   const dataa = await writeFileSync(filePath, data);
    console.log(chalk.green("Todo added successfully!"));
}
else {
    console.log(chalk.red("No todo entered."));
}
console.log(todos);
