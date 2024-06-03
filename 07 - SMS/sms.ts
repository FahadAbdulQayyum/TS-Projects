import inquirer from "inquirer";
import chalk from "chalk";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, "studentsData.json");
interface studentInt {
  name: string;
  rollNo: number;
  feePaymentStatus: string[];
}
class SMS {
  constructor() {}

  inpt = async (
    type: string = "input",
    name: string,
    msg: string,
    choices?: string[]
  ) => {
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

  read() {
    return readFileSync(filePath, "utf8");
  }

  write(data: studentInt, filteredData?: studentInt[]) {
    let rd = JSON.parse(this.read());
    let dt = filteredData ? [...filteredData, data] : [...rd, data];
    writeFileSync(filePath, JSON.stringify(dt));
  }

  async updatePaymentStatus(roll: number) {
    let res = JSON.parse(this.read());
    let found = res.find((v: studentInt) => v.rollNo === roll);
    console.log("found:", found);
    // let paymentMonth = await this.inpt(
    //   undefined,
    //   "pay",
    //   "Enter the month paid:"
    // );
    let paymentMonth = await this.inpt("list", "pay", "Enter your month:", [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]);
    let otherData = res.filter((v: studentInt) => v.rollNo !== found.rollNo);
    found.feePaymentStatus.push(paymentMonth.pay);
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

  const { rollNo } = await sms.inpt(
    undefined,
    "rollNo",
    "Enter students roll:"
  );
  let data: studentInt = { name, rollNo, feePaymentStatus: [] };
  sms.write(data);
} else if (res.option === "Update Student Payment") {
  const { studentRollNo } = await sms.inpt(
    undefined,
    "studentRollNo",
    "Enter Student's rollNo:"
  );
  sms.updatePaymentStatus(studentRollNo);
} else if (res.option === "Look Students Information") {
  const dt = JSON.parse(sms.read());
  console.log(
    chalk.bgCyanBright(
      "***********************************************************"
    )
  );
  console.log(
    chalk.bgBlackBright(
      "**************** ALL STUDENTS INFORMATIONS ****************"
    )
  );
  console.log(" ");
  dt.map((v: studentInt, i: number) =>
    console.log(
      chalk.magenta(
        i +
          1 +
          ": " +
          v.name +
          " --- " +
          v.rollNo +
          " --- " +
          "( " +
          v.feePaymentStatus.join(", ") +
          " )"
      )
    )
  );
  console.log(" ");
  console.log(
    chalk.bgBlackBright(
      "***********************************************************"
    )
  );
  console.log(
    chalk.bgCyanBright(
      "***********************************************************"
    )
  );
}
