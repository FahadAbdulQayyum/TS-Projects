import inquirer from "inquirer";
import chalk from "chalk";
enum CurrencyExchange {
  USD = 275,
}
class Currency {
  constructor() {}

  inpt = async (name: string, msg: string) => {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: name,
        message: msg,
      },
    ]);
    return answers;
  };
  main = async (name: string, msg: string) => {
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
let currency = new Currency();
const res = await currency.main("inp", "Select your currency conversion:");
if (res.inp === "USD - PKR") {
  const ress = await currency.inpt(
    "inp",
    "Enter you rate" + " (" + res.inp + ")"
  );
  console.log(
    chalk.green(
      "$" + ress.inp + " = " + +ress.inp * CurrencyExchange.USD + "PKR"
    )
  );
} else {
  const ress = await currency.inpt(
    "inp",
    "Enter you rate" + " (" + res.inp + ")"
  );
  console.log(
    chalk.green(
      ress.inp + "PKR = $" + (+ress.inp / CurrencyExchange.USD).toFixed(2)
    )
  );
}
