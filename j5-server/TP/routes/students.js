const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

router.get('/', studentsController.getStudents);
router.post('/addStudent', studentsController.addStudent);
router.post('/removeStudent', studentsController.removeStudent);

module.exports = router;
