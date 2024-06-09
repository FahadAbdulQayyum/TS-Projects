import inquirer from "inquirer";
import chalk from "chalk";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
// import bankInfo from "./bank.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, "bank.json");

interface bankInfoInt {
  id: number;
  username: string;
  pin: string;
  dob: string;
}
class MyBank {
  constructor() {}
  async process(
    type: string = "input",
    name: string,
    message: string,
    choices?: string[]
  ): Promise<any> {
    let answers = await inquirer.prompt([
      { type: type, name, message, choices },
    ]);
    return answers[name];
  }
  readInformation() {
    return JSON.parse(readFileSync(filePath, "utf8"));
  }
  async saveInformation(data: bankInfoInt[]) {
    console.log("dataaaa", data);
    await writeFileSync(filePath, JSON.stringify(data));
  }
  async insertInfo() {
    const username = await myBank.process(
      undefined,
      "username",
      "Enter username:"
    );
    const pin = await this.process(undefined, "pin", "Enter pin:");
    const dob = await this.process(undefined, "dob", "Enter dob:");
    let existingData: bankInfoInt[] = this.readInformation();
    let data: bankInfoInt = { id: existingData.length + 1, username, pin, dob };
    let arr: bankInfoInt[] = [];
    arr.push(...existingData, data);
    this.saveInformation(arr);
  }
  async updateInfo() {
    const fetchedData: bankInfoInt[] = this.readInformation();
    const id = await myBank.process(undefined, "id", "Enter id:");
    let filteredData;
    let restData;
    if (fetchedData) {
      filteredData = fetchedData.filter((v: bankInfoInt) => v.id === +id);
      restData = fetchedData.filter((v: bankInfoInt) => v.id !== +id);
      // filteredData = fetchedData.find((v: bankInfoInt) => v.id === id);
      console.log("filtered data: " + JSON.stringify(filteredData));
    }
    const choose = await this.process("list", "choose", "What to update:", [
      "username",
      "pin",
      "dob",
    ]);
    if (choose === "username") {
      let updateUsername = await this.process(
        undefined,
        "updateUsername",
        "Enter new username"
      );
      // let dt = filteredData && (filteredData[0]["username"] = updateUsername);
      filteredData && (filteredData[0]["username"] = updateUsername);
      console.log("filtereedData", filteredData);
      // let dt = { ...fetchedData, ...filteredData };
      // let dt: bankInfoInt[] | undefined = [...fetchedData, ...filteredData];
      let filteredDataa = filteredData && Object.entries(filteredData);
      let dt: bankInfoInt[] | undefined = filteredDataa &&
        restData && [...restData, ...filteredDataa.map((v) => v[1])];
      console.log("dttt", dt);
      dt && this.saveInformation(dt);
    }
  }
}
const myBank: MyBank = new MyBank();
const ans = await myBank.process(undefined, "username", "Enter your username");
console.log("ans::", ans);

const ansChoices = await myBank.process(
  "list",
  "username",
  "Enter your choices",
  [
    "Enter An Applicant",
    "Update Applicant",
    "Balance Inquiry",
    "Password Change",
  ]
);

console.log("ans::", ansChoices);
if (ansChoices === "Enter An Applicant") {
  myBank.insertInfo();
} else if (ansChoices === "Update Applicant") {
  myBank.updateInfo();
}
