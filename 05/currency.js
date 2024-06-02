import inquirer from "inquirer";
import chalk from "chalk";
var CurrencyExchange;
(function (CurrencyExchange) {
    CurrencyExchange[CurrencyExchange["USD"] = 275] = "USD";
})(CurrencyExchange || (CurrencyExchange = {}));
class Currency {
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
        this.main = async (name, msg) => {
            const answers = await inquirer.prompt([
                {
                    // type: "input",
                    type: "list",
                    name: name,
                    message: msg,
                    choices: ["USD - PKR", "PKR - USD"],
                },
            ]);
            return answers;
        };
    }
}
let currency = new Currency();
const res = await currency.main("inp", "Select your currency conversion:");
if (res.inp === "USD - PKR") {
    const ress = await currency.inpt("inp", "Enter you rate" + " (" + res.inp + ")");
    //   console.log(chalk.green("$" + ress.inp + "= " + +ress.inp * 275 + "PKR"));
    console.log(chalk.green("$" + ress.inp + " = " + +ress.inp * CurrencyExchange.USD + "PKR"));
}
else {
    const ress = await currency.inpt("inp", "Enter you rate" + " (" + res.inp + ")");
    //   console.log(chalk.green(ress.inp + "PKR = $" + (+ress.inp / 275).toFixed(2)));
    console.log(chalk.green(ress.inp + "PKR = $" + (+ress.inp / CurrencyExchange.USD).toFixed(2)));
}
