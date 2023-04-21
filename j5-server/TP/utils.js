const addStudent = (students, student) => {
    students.push(student);
};

const removeStudent = (students, name) => {
    const index = students.findIndex(student => student.name === name);
    if (index !== -1) {
        students.splice(index, 1);
    }
};

const getStudents = (students) => {
    return students;
};

module.exports = { addStudent, removeStudent, getStudents };
