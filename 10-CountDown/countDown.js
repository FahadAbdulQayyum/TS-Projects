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
                // countDown(+answers.number1);
                countDown();
            }
        }
    }
    catch (error) { }
}
// function countDown(min: number) {
function countDown() {
    let timer = setInterval(() => {
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
        if ((hr === 0 || hr === "00") &&
            (minn === 0 || minn === "00") &&
            (sec === 0 || sec === "00")) {
            return stopInterval();
        }
        if (minn === "00" || minn === 0) {
            if (hr !== 0)
                minn = 59;
            hr = +hr;
            if (hr !== 0)
                hr--;
        }
        console.log(hr + ":" + minn + ":" + sec);
        sec = Number(sec);
        sec--;
    }, 1);
    function stopInterval() {
        clearInterval(timer);
    }
}
main();
