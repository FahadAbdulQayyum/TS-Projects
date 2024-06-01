import inquirer from "inquirer";
import chalk from "chalk";
import todoJson from "./todo.json" assert { type: "json" };
import { readFileSync, writeFileSync } from "fs";
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
function read() {
    let data = readFileSync(filePath, "utf8"); //data= [{todo:"faad"}]
    return JSON.parse(data);
}
async function write(dataa) {
    return await writeFileSync(filePath, JSON.stringify(dataa));
}
if (res.todo) {
    const data = read();
    data.push({ todo: res.todo });
    write(data);
    console.log(chalk.green("Todo added successfully!"));
}
else {
    console.log(chalk.red("No todo entered."));
}
console.log(todos);
