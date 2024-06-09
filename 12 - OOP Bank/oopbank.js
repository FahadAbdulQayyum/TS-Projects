import inquirer from "inquirer";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
// import bankInfo from "./bank.json" assert { type: "json" };
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, "bank.json");
class MyBank {
    constructor() { }
    async process(type = "input", name, message, choices) {
        let answers = await inquirer.prompt([
            { type: type, name, message, choices },
        ]);
        return answers[name];
    }
    readInformation() {
        return JSON.parse(readFileSync(filePath, "utf8"));
    }
    async saveInformation(data) {
        console.log("dataaaa", data);
        await writeFileSync(filePath, JSON.stringify(data));
    }
}
const myBank = new MyBank();
const ans = await myBank.process(undefined, "username", "Enter your username");
console.log("ans::", ans);
const ansChoices = await myBank.process("list", "username", "Enter your choices", [
    "Enter An Applicant",
    "Update Applicant",
    "Balance Inquiry",
    "Password Change",
]);
console.log("ans::", ansChoices);
if (ansChoices === "Enter An Applicant") {
    const username = await myBank.process(undefined, "username", "Enter username:");
    const pin = await myBank.process(undefined, "pin", "Enter pin:");
    const dob = await myBank.process(undefined, "dob", "Enter dob:");
    let data = { username, pin, dob };
    let arr = [];
    let existingData = myBank.readInformation();
    // console.log("existing Data: " + existingData);
    // arr.push(data);
    arr.push(...existingData, data);
    myBank.saveInformation(arr);
}
