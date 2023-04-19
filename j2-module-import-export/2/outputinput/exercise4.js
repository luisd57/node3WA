const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

function displayBoard() {
    console.log('\n');
    board.forEach((row, rowIndex) => {
        console.log(row.join(' | '));
        if (rowIndex < 2) {
            console.log('---------');
        }
    });
    console.log('\n');
}

let currentPlayer = Math.random() < 0.5 ? 'X' : 'O';

function checkWin(player) {
    for (let i = 0; i < 3; i++) {
        if (
            (board[i][0] === player && board[i][1] === player && board[i][2] === player) || (board[0][i] === player && board[1][i] === player && board[2][i] === player)
        ) {
            return true;
        }
    }
    if (
        (board[0][0] === player && board[1][1] === player && board[2][2] === player)
        || (board[0][2] === player && board[1][1] === player && board[2][0] === player)
    ) {
        return true;
    }
    return false;
}

function checkDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                return false;
            }
        }
    }
    return true;
}

function makeComputerMove() {
    let i, j;
    do {
        i = Math.floor(Math.random() * 3);
        j = Math.floor(Math.random() * 3);
    } while (board[i][j] !== ' ');

    board[i][j] = 'O';
}

function playGame() {
    if (currentPlayer === 'O') {
        console.log("Computer's turn.");
        makeComputerMove();
        currentPlayer = 'X';
        displayBoard();
    }

    if (checkWin('X')) {
        console.log('You win!');
        rl.close();
        return;
    }

    if (checkWin('O')) {
        console.log("Computer wins!");
        rl.close();
        return;
    }

    if (checkDraw()) {
        console.log("Draw!");
        rl.close();
        return;
    }

    rl.question("Enter the coordinates of your move (row, column): ", input => {
        const [i, j] = input.split(',').map(x => parseInt(x.trim()) - 1);

        if (board[i][j] === ' ') {
            board[i][j] = 'X';
            currentPlayer = 'O';
        } else {
            console.log('This box is already occupied, please choose another one.');
        }

        playGame();
    });
}

playGame();
