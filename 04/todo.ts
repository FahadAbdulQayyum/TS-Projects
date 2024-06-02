import inquirer from "inquirer";
import chalk from "chalk";
import todoJson from "./todo.json" assert { type: "json" };
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

class Todo {
  constructor() {}
  main = async (name: string, msg: string) => {
    const answers = await inquirer.prompt([
      { type: "input", name: name, message: msg },
    ]);
    return answers;
  };
}

const todoInstance: Todo = new Todo();
const res = await todoInstance.main("todo", "Enter your todo:");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(__dirname, "todo.json");
interface TodoItem {
  todo: string;
}
type TodoList = TodoItem[];
const todos: TodoList = todoJson;
function read() {
  let data = readFileSync(filePath, "utf8"); //data= [{todo:"faad"}]
  return JSON.parse(data);
}

async function write(dataa: any) {
  return await writeFileSync(filePath, JSON.stringify(dataa));
}
if (res.todo) {
  const data = read();
  data.push({ todo: res.todo });
  write(data);
  // setTimeout(() => {
  let updatedData = read();
  updatedData = JSON.stringify(updatedData);
  console.log(chalk.green("Todo added successfully!"));

  console.log(JSON.parse(updatedData));
  // }, 2000);
} else {
  console.log(chalk.red("No todo entered."));
}
// console.log(todos);
