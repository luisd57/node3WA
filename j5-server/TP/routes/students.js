const express = require('express');
const router = express.Router();
const { addStudent, removeStudent } = require('../utils');
const students = require('../Data/students');

router.get('/', (req, res) => {
    res.json(students);
});

router.post('/addStudent', (req, res) => {
    const { name, birth } = req.body;
    addStudent(students, { name, birth });
    res.json({ success: true });
});

router.post('/removeStudent', (req, res) => {
    const { name } = req.body;
    removeStudent(students, name);
    res.json({ success: true });
});

module.exports = router;
