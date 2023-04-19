const readline = require('readline');
const rlinterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;
console.log("Guess a number between 1 and 100. You have 10 attempts.");

function askForGuess() {
    rlinterface.question("Your guess: ", (answer) => {
        const guess = parseInt(answer);
        if (isNaN(guess)) {
            console.log("Please enter a valid number.");
            return askForGuess();
        }
        attempts--;
        if (guess === randomNumber) {
            console.log("You guessed the number!");
            return rlinterface.close;
        }
        if (attempts === 0) {
            console.log(`You've run out of attempts. The number was ${randomNumber}`);
        }
        if (guess < randomNumber) {
            console.log(`The correct number is larger. You have ${attempts} attempts remaining.`);
        } else {
            console.log(`The correct number is smaller. You have ${attempts} attempts remaining.`);
        }
        askForGuess();
    });
}
askForGuess();