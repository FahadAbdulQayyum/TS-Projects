import inquirer from "inquirer";
class Counter {
    constructor() {
        this.inpt = async (name, msg) => {
            const answers = await inquirer.prompt([
                {
                    type: "input",
                    name: name,
                    message: msg,
                },
            ]);
            return answers;
        };
    }
}
let counter = new Counter();
const res = await counter.inpt("inp", "Type your paragraph/sentence:");
let len = res.inp.split(" ");
let charLen = len
    .map((v) => v.length)
    .reduce((a, b) => +b + +a, 0);
console.log("Words Count:", len.length);
console.log("Char Count:", charLen);
