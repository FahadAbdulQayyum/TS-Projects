import inquirer from "inquirer";
import chalk from "chalk";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import {
  EnterAccount,
  UpdateAccount,
  DeleteAccount,
  BalanceInquiry,
  PasswordChange,
} from "./constant.js";
// import bankInfo from "./bank.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, "bank.json");

interface bankInfoInt {
  id: number;
  username: string;
  pin: string;
  dob: string;
  [key: string]: any;
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
  async deleteInfo() {
    const fetchedData: bankInfoInt[] = this.readInformation();
    const id = await myBank.process(undefined, "id", "Enter id:");
    let restData;
    if (fetchedData) {
      restData = fetchedData.filter((v: bankInfoInt) => v.id !== +id);
    }
    let dt: bankInfoInt[] | undefined = restData && [...restData];
    dt && this.saveInformation(dt);
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
      this.fieldUpdate("username", filteredData, restData);
    } else if (choose === "pin") {
      this.fieldUpdate("pin", filteredData, restData);
    } else if (choose === "dob") {
      this.fieldUpdate("dob", filteredData, restData);
    }
  }
  async fieldUpdate(
    field: string,
    filteredData: bankInfoInt[] | undefined,
    restData: bankInfoInt[] | undefined
  ) {
    let update = await this.process(undefined, "update", "Enter new " + field);

    filteredData && (filteredData[0][field] = update);
    let filteredDataa = filteredData && Object.entries(filteredData);
    let dt: bankInfoInt[] | undefined = filteredDataa &&
      restData && [...restData, ...filteredDataa.map((v) => v[1])];
    dt && this.saveInformation(dt);
  }
}
const myBank: MyBank = new MyBank();
const ans = await myBank.process(undefined, "username", "Enter your username");
console.log("ans::", ans);

const ansChoices = await myBank.process(
  "list",
  "username",
  "Enter your choices",
  [EnterAccount, UpdateAccount, DeleteAccount, BalanceInquiry, PasswordChange]
);

console.log("ans::", ansChoices);
if (ansChoices === EnterAccount) {
  myBank.insertInfo();
} else if (ansChoices === UpdateAccount) {
  myBank.updateInfo();
} else if (ansChoices === DeleteAccount) {
  myBank.deleteInfo();
}
