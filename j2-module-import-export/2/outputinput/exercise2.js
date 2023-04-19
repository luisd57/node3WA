const fs = require("fs");
const readline = require("readline");
const students = JSON.parse(fs.readFileSync("./Data/students.json"));

function calculateAverage(name) {
    let total = 0;
    let count = 0;
    for (const student of students) {
        if (student.name.toLowerCase() === name.toLowerCase()) {
            total += student.notes;
            count++;
        }
    }
    if (count === 0) {
        throw new Error(`Student ${name} not found`);
    }
    return total / count;
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    while (true) {
        try {
            const name = await new Promise((resolve) => {
                rl.question("Enter student name (or 'quit' to exit): ", resolve);
            });
            if (name.toLowerCase() === "quit") {
                break;
            }
            const average = calculateAverage(name);
            console.log(`${name}: ${average.toFixed(2)}`);
        } catch (error) {
            console.error(error.message);
        }
    }

    rl.close();
}

main();
