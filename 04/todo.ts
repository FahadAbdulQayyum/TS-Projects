import inquirer from "inquirer";
import chalk from "chalk";
import todoJson from "./todo.json" assert { type: "json" };

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
const res: { todo: string } = await todoInstance.main(
  "todo",
  "Enter your todo:"
);

interface TodoItem {
  todo: string;
}
type TodoList = TodoItem[];
const todos: TodoList = todoJson;
if (res.todo) {
  todos.push({ todo: res.todo });
  console.log(chalk.green("Todo added successfully!"));
} else {
  console.log(chalk.red("No todo entered."));
}
console.log(todos);
