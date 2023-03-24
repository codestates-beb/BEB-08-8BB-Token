const express = require('express');
const router = express.Router();
const controllers = require('../controllers/main.controller');

router.get('/', controllers.main_get);

module.exports = router;