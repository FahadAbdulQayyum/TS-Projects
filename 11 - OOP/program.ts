import inquirer from "inquirer";
import { Person } from "./person.js";

class Program {
  async input(
    type: string = "input",
    name: string,
    message: string,
    choice?: string
  ) {
    let inp = await inquirer.prompt([{ type, name, message, choice }]);
    return inp.name;
  }

  async main() {
    try {
      let inp: string = await this.input(
        undefined,
        "name",
        "Type 1 if you like to talk to others and type 2 if you would rather keep to yourself: "
      );

      let MyPerson: Person = new Person();

      MyPerson.AskQuestion(+inp);
      console.log("You are:", MyPerson.GetPersonality());
    } catch (err) {
      console.error("Please enter an integer value.");
    }
  }
}

const program: Program = new Program();
program.main();
