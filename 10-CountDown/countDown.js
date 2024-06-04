import inquirer from "inquirer";
// let hr: number | string = 23;
let hr = 1;
let minn = 59;
let sec = 59;
async function main() {
    try {
        while (1) {
            let answers = await inquirer.prompt([
                {
                    type: "input",
                    name: "number1",
                    message: "Enter the minutes:",
                },
            ]);
            if (answers.number1 === "x") {
                break;
            }
            else {
                countDown(+answers.number1);
            }
        }
    }
    catch (error) { }
}
function countDown(min) {
    setInterval(() => {
        console.clear();
        if (typeof sec === "number" && sec < 10) {
            sec = "0" + sec;
        }
        if (typeof minn === "number" && minn < 10) {
            minn = "0" + minn;
        }
        if (typeof hr === "number" && hr < 10) {
            hr = "0" + hr;
        }
        if (sec === "00" || sec === 0) {
            sec = 59;
            minn = Number(minn);
            minn--;
        }
        if (minn === "00" || minn === 0) {
            minn = 59;
            // typeof hr === "number" && hr--;
            hr = +hr;
            hr--;
        }
        // if (hr === "01" || hr === 1) {
        if (hr === 0) {
            console.log("zero hr");
        }
        if ((hr === "00" || hr === 0) &&
            (minn === "00" || minn === 0) &&
            (sec === "00" || sec === 0)) {
            clearInterval;
        }
        console.log(hr + ":" + minn + ":" + sec);
        sec = Number(sec);
        typeof sec === "number" && sec--;
    }, 1);
}
main();
