import inquirer from "inquirer";
import { Person } from "./person.js";
class Program {
    async input(type = "input", name, message, choice) {
        let inp = await inquirer.prompt([{ type, name, message, choice }]);
        return inp.name;
    }
    async main() {
        try {
            let inp = await this.input(undefined, "name", "Type 1 if you like to talk to others and type 2 if you would rather keep to yourself: ");
            let MyPerson = new Person();
            MyPerson.AskQuestion(+inp);
            console.log("You are:", MyPerson.GetPersonality());
        }
        catch (err) {
            console.error("Please enter an integer value.");
        }
    }
}
const program = new Program();
program.main();