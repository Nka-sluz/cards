import { Game } from "./game.ts";

console.clear();
const name = prompt("What's your name?");
console.clear();
console.log(`Hello, ${name}!`);

let rawBalance = prompt("How much money do you want to start with?");
while (rawBalance === null || Number.isNaN(Number.parseFloat(rawBalance))) {
  console.clear();
  rawBalance = prompt("Please enter a valid number for your starting balance.");
}
const startingBalance = Number.parseFloat(rawBalance ?? "1");
console.clear();
const game = new Game(undefined, undefined, startingBalance);
game.playGame();
