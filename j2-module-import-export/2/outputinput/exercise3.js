const choices = ['rock', 'paper', 'scissors'];

function getRandomChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getWinner(choice1, choice2) {
    if (choice1 === choice2) {
        return 'draw';
    }

    if (
        (choice1 === 'rock' && choice2 === 'scissors') ||
        (choice1 === 'paper' && choice2 === 'rock') ||
        (choice1 === 'scissors' && choice2 === 'paper')
    ) {
        return 'player1';
    } else {
        return 'player2';
    }
}

function runGame(player1Score, player2Score) {
    const player1Choice = getRandomChoice();
    const player2Choice = getRandomChoice();

    console.log('Player 1:', player1Choice);
    console.log('Player 2:', player2Choice);

    const winner = getWinner(player1Choice, player2Choice);
    if (winner === 'draw') {
        console.log("It's a draw!");
    } else {
        console.log(`The winner is ${winner}`);
        if (winner === 'player1') {
            player1Score++;
        } else {
            player2Score++;
        }
    }

    console.log('Score - Player 1:', player1Score, 'Player 2:', player2Score);
    console.log('-------------');

    return [player1Score, player2Score];
}

let player1Score = 0;
let player2Score = 0;

while (player1Score < 3 && player2Score < 3) {
    [player1Score, player2Score] = runGame(player1Score, player2Score);
}

console.log(`The winner of the game is ${player1Score === 3 ? 'Player 1' : 'Player 2'}`);
