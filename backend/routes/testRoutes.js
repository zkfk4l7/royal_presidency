const express = require('express');
const router = express.Router();
const { seedDB } = require('../controllers/testController');

router.post('/seed', seedDB);

module.exports = router;
