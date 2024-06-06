import inquirer from "inquirer";
let hr = 1;
let minn = 59;
let sec = 59;
async function main() {
    try {
        while (true) {
            let answers = await inquirer.prompt([
                {
                    type: "input",
                    name: "number1",
                    message: "Enter the minute (Press x to exit):",
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
    catch (error) {
        console.error(error);
    }
}
function countDown(min) {
    hr = 0;
    minn = min;
    sec = 0;
    let timer = setInterval(() => {
        console.clear();
        // Add leading zeros if needed
        let hour = typeof hr === "number" && hr < 10 ? "0" + hr : hr;
        let Minute = typeof minn === "number" && minn < 10 ? "0" + minn : minn;
        let Second = typeof sec === "number" && sec < 10 ? "0" + sec : sec;
        console.log(hour + ":" + Minute + ":" + Second);
        if (sec === 0) {
            if (minn === 0) {
                if (hr === 0) {
                    clearInterval(timer);
                    console.log("Time's up!");
                    return;
                }
                else {
                    hr = +hr;
                    hr--;
                    minn = 59;
                }
            }
            else {
                minn = +minn;
                minn--;
            }
            sec = 59;
        }
        else {
            sec = +sec;
            sec--;
        }
    }, 1000);
}
main();
