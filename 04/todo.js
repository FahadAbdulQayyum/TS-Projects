import inquirer from "inquirer";
import chalk from "chalk";
import todoJson from "./todo.json" assert { type: "json" };
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
const todos = todoJson;
if (res.todo) {
    todos.push({ todo: res.todo });
    console.log(chalk.green("Todo added successfully!"));
}
else {
    console.log(chalk.red("No todo entered."));
}
console.log(todos);
