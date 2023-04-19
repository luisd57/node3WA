const fs = require('fs');

fs.readFile('data/students.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const fileContent = fs.readFileSync('data/students.txt', 'utf8');
    const lines = fileContent.split('\n');
    const students = [];

    lines.slice(1).forEach(line => {
        const [note, name, address] = line.trim().split(' ');
        students.push({ name, note: parseInt(note), address });
    });

    const highGradeStudents = students.filter(student => student.note > 17);

    const bestStudent = students.reduce((best, student) => {
        return student.note > best.note ? student : best;
    });
    students.sort((a, b) => a.note - b.note);

    console.log('students', students);
    console.log('students with more than 17 :', highGradeStudents);
    console.log('best student', bestStudent);

    // Additional

    const newStudents = [
        '18 Sonia Paris',
        '17 Clarisse Marseille'
    ];

    const upperCaseNewStudents = newStudents.map(student => {
        const [note, name, address] = student.split(' ');
        return `${note} ${name.toUpperCase()} ${address}`;
    });

    upperCaseNewStudents.forEach(newStudent => {
        fs.appendFile('data/students.txt', '\n' + newStudent, err => {
            if (err) {
                console.error(err);
                return;
            }
        });
    });

    fs.readFile('data/students.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const lines = data.split('\n');
        const upperCaseStudents = lines.slice(1).map(line => {
            const [note, name, address] = line.trim().split(' ');
            if (note && name && address) {
                return `${note} ${name.toUpperCase()} ${address}`;
            } else {
                return '';
            }
        }).filter(line => line);
        console.log(upperCaseStudents);
    });
});
