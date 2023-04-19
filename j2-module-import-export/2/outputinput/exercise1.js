const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const students = ["Alan", "Sonia", "Sophie"];

function findStudent(name) {
  const formattedName = name.trim().toLowerCase();
  return students.some((student) => student.toLowerCase() === formattedName);
}

function askForStudentName() {
  rl.question("Entrez le nom d'un étudiant : ", (name) => {
    if (findStudent(name)) {
      console.log(`L'étudiant ${name} a été trouvé dans la liste.`);
      rl.close();
    } else {
      console.log(`L'étudiant ${name} n'a pas été trouvé dans la liste.`);
      askForStudentName();
    }
  });
}

askForStudentName();
