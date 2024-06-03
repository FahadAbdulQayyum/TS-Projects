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

const todoInstance: Todo = new Todo();
const opt = await todoInstance.main(
  "option",
  "Enter your options.\n1. Enter Todo.\n2. Delete Todo.\n\t::"
);
if (+opt.option === 2) {
  const id = await todoInstance.main("num", "Enter todo id:");
  let r = read();
  r = r.filter((v: { id: number; todo: string }) => v.id !== +id.num);
  write(r);
  console.log(chalk.green("Todo deleted successfully!"));
} else if (+opt.option === 1) {
  const res = await todoInstance.main("todo", "Enter your todo:");

  if (res.todo) {
    const data = read();
    data.push({ id: data.length + 1, todo: res.todo });
    write(data);
    let updatedData = read();
    updatedData = JSON.stringify(updatedData);
    console.log(chalk.green("Todo added successfully!"));
    updatedData = JSON.parse(updatedData);
    updatedData.map((v: { todo: string }, i: string) =>
      console.log(i + 1 + ": " + v.todo)
    );
  } else {
    console.log(chalk.red("No todo entered."));
  }
}
