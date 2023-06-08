const express = require('express');
const relaySearchController = require('../controllers/relaySearchController');

const router = express.Router();

router.post('/', relaySearchController.relaySearch);

module.exports = router;
