import inquirer from "inquirer";
import chalk from "chalk";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, "studentsData.json");
class SMS {
    constructor() {
        this.inpt = async (type = "input", name, msg, choices) => {
            const answers = await inquirer.prompt([
                {
                    type: type,
                    name: name,
                    message: msg,
                    choices: choices,
                },
            ]);
            return answers;
        };
    }
    read() {
        return readFileSync(filePath, "utf8");
    }
    write(data, filteredData) {
        let rd = JSON.parse(this.read());
        // let dt = [rd, data];
        // let dt = [...rd, data];
        // let dt = [filteredData ? filteredData : rd, data];
        let dt = filteredData ? [...filteredData, data] : [...rd, data];
        // let dt = data;
        // let dt = data;
        writeFileSync(filePath, JSON.stringify(dt));
    }
    // async updatePaymentStatus(data: studentInt) {
    async updatePaymentStatus(roll) {
        let res = JSON.parse(this.read());
        let found = res.find((v) => v.rollNo === roll);
        console.log("found:", found);
        let paymentMonth = await this.inpt(undefined, "pay", "Enter the month paid:");
        let otherData = res.filter((v) => v.rollNo !== found.rollNo);
        console.log("::otherData::", otherData);
        found.feePaymentStatus.push(paymentMonth.pay);
        console.log("::found::", found);
        // this.write({ ...otherData, found });
        this.write(found, otherData);
    }
}
let sms = new SMS();
const res = await sms.inpt("list", "option", "Enter your choices:", [
    "Enter Students Info",
    "Update Student Payment",
    "Look Students Information",
]);
if (res.option === "Enter Students Info") {
    console.log(chalk.yellow("********************************"));
    const { name } = await sms.inpt(undefined, "name", "Enter students name:");
    const { rollNo } = await sms.inpt(undefined, "rollNo", "Enter students roll:");
    let data = { name, rollNo, feePaymentStatus: [] };
    sms.write(data);
}
else if (res.option === "Update Student Payment") {
    const { studentRollNo } = await sms.inpt(undefined, "studentRollNo", "Enter Student's rollNo:");
    sms.updatePaymentStatus(studentRollNo);
}
