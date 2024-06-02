import inquirer from "inquirer";
import chalk from "chalk";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import data from "./data.json" assert { type: "json" };
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, "data.json");
class ATM {
    constructor() {
        this.main = async (name, msg) => {
            const answers = await inquirer.prompt([
                { type: "input", name: name, message: msg },
            ]);
            return answers;
        };
        this.welcomeToBank = async (userInfo) => {
            console.log(chalk.black("1. Check Balance.\n2. Withdraw Amount"));
            let res = await this.main("input", "Enter your options...");
            if (+res.input === 1) {
                console.log(chalk.black("Your amount is: " + userInfo.amount));
            }
            else {
                let res = await this.main("input", "Amount to Withdraw: ");
                let amount = +userInfo.amount.split("$")[1];
                // amount = +res.input - amount;
                amount = amount - +res.input;
                userInfo.amount = "$" + amount.toString();
                console.log(chalk.black("Your remaining amount is: " + userInfo.amount));
                let read = JSON.parse(this.read());
                let found = read.find((v) => v.username === userInfo.username);
                let otherThanFound = read.filter((v) => v.username !== userInfo.username);
                console.log("ohterThanFound", otherThanFound, "found", found);
                found = userInfo;
                for (let v of read) {
                    if (v.username === found.username) {
                        read = [...otherThanFound, found];
                    }
                }
                let updatedData = read;
                this.write(updatedData);
            }
        };
    }
    read() {
        let dt = readFileSync(filePath, "utf8");
        return dt;
    }
    async write(data) {
        await writeFileSync(filePath, JSON.stringify(data));
    }
}
const atm = new ATM();
const res = await atm.main("num1", "Enter your name:");
const { num1 } = res;
let result = data.find((d) => d.name.toLowerCase() === num1.toLowerCase());
if (result) {
    const atm = new ATM();
    const res = await atm.main("pin", "Enter your pin:");
    const { pin } = res;
    if (result.pin === +pin) {
        console.log(chalk.yellow("Welcome to DUDE Bank!"));
        atm.welcomeToBank(result);
    }
    else {
        console.log(chalk.red("Sorry, Wrong Pin!"));
    }
}
else {
    console.log(chalk.red("Sorry, Wrong ATM!"));
}
