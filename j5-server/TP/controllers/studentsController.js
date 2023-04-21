const { addStudent, removeStudent } = require('../utils');
const students = require('../Data/students');

exports.getStudents = (req, res) => {
  res.json(students);
};

exports.addStudent = (req, res) => {
  const { name, birth } = req.body;
  addStudent(students, { name, birth });
  res.json({ success: true });
};

exports.removeStudent = (req, res) => {
  const { name } = req.body;
  removeStudent(students, name);
  res.json({ success: true });
};
