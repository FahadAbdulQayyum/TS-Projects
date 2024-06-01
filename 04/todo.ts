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

if (res.todo) {
  let data: string | { todo: string }[] = readFileSync(filePath, "utf8");
  //   data = JSON.parse(data);
  console.log("dta", data);
  //   todos.push({ todo: res.todo });
  //   typeof data !== "string" ? data.push({ todo: res.todo }) : "";
  if (typeof data === "object") {
    data.push({ todo: res.todo });
  }else{
console.log('Wrong')
  }
  //   const dataa = await writeFileSync(filePath, data);
  else console.log(chalk.green("Todo added successfully!"));
} else {
  console.log(chalk.red("No todo entered."));
}
console.log(todos);
