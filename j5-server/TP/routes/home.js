const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.get('/students', homeController.students);

module.exports = router;
