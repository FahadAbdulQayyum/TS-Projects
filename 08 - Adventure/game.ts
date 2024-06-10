import inquirer from "inquirer";
import chalk from "chalk";

class Main {
  async input(
    type: string = "input",
    name: string,
    message: string,
    choices?: string[]
  ): Promise<string> {
    const inp = await inquirer.prompt([{ type, name, message, choices }]);
    return inp[name];
  }
}
// System Objects
const main: Main = new Main();
const rand = Math.round(Math.random() * 10).toFixed(0);

// Game Variables
const enemies: string[] = ["Skeleton", "Zombie", "Warrior", "Assassin"];
const maxEnemyHealth: number = 75;
const enemyAttackDamage: number = 25;

// Player variables
let health: number = 100;
let attackDamage: number = 50;
let numHealthPotions: number = 3;
let healthPotionHealAmount: number = 30;
let healthPotionDropChance: number = 50; // percentage

const running: boolean = true;

console.log(chalk.cyanBright("Welcome to Dungeon!"));

GAME: while (running) {
  console.log(
    "----------------------------------------------------------------"
  );

  let enemyHealth: number = Math.floor(Math.random() * maxEnemyHealth);
  let enemy: string = enemies[Math.floor(Math.random() * enemies.length)];
  console.log("\t#", enemy, "has appeared! #\n"); // # Skeleton has appeared #

  while (enemyHealth > 0) {
    console.log("\tYour HP:", health);
    console.log("\t", enemy + "'s HP:", enemyHealth);
    console.log("\n\tWhat would you like to do?");
    console.log("\t1. Attack");
    console.log("\t2. Drink health potion");
    console.log("\t3. Run");

    const input: string = await main.input(
      undefined,
      "input",
      "Enter your input"
    );
    if (input === "1") {
      let damageDealt: number = Math.floor(Math.random() * attackDamage);
      let damageTaken: number = Math.floor(Math.random() * enemyAttackDamage);
      enemyHealth -= damageDealt;
      health -= damageTaken;
      console.log("\t> You strike the", enemy, "for", damageDealt, "damage.");
      console.log("\t> You recieved", damageTaken, "in retaliation.");
      if (health < 1) {
        console.log(
          "\t> You have take too much damage, you are too weak to go on!"
        );
        break;
      }
    } else if (input === "2") {
      if (numHealthPotions > 0) {
        health += healthPotionHealAmount;
        numHealthPotions--;
        console.log(
          "\t> You drink a healthy potion, healing yourself for",
          healthPotionHealAmount + "." + "\n\t> You now have",
          health,
          "HP.",
          "\n\t> You have",
          numHealthPotions,
          "health potions left.\n"
        );
      } else {
        console.log(
          "\t> You have no health potions left! Defeat enemies for a chance to get one!\n"
        );
      }
    } else if (input === "3") {
      console.log("\tYou run away from the", enemy + "!");
      continue GAME;
    } else {
      console.log("\tInvalid command!");
    }
    if (health < 1) {
      console.log("You limp out of the dungeon, weak from battle.");
      break;
    }
    console.log(
      "----------------------------------------------------------------"
    );
    console.log(" #", enemy, "was defeated! # ");
    console.log(" # You have", health, "HP left. # ");
    if (Math.floor(Math.random() * 100) < healthPotionDropChance) {
      numHealthPotions++;
      console.log(" # The", enemy, "dropped a health potion! #");
      console.log(" # You now have", numHealthPotions, "health potion(s). #");
    }
    console.log(
      "----------------------------------------------------------------"
    );
    console.log("What would you like to do now?");
    console.log("1. Continue fighting");
    console.log("2. Exit dungeon");
  }
  let inp = await main.input(undefined, "options", "Enter your options");
  while (inp !== "1" && inp !== "2") {
    console.log("Invalid command!");
    inp = await main.input(undefined, "options", "Enter your options");

    if (inp === "1") {
      console.log("You continue on your adventure!");
    } else if (inp === "2") {
      console.log("You exit the dungeon, successful from your adventures!");
      break;
    }
  }
  console.log("#######################");
  console.log("# THANKS FOR PLAYING!");
  console.log("#######################");
}
