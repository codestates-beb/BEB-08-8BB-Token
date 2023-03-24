const express = require('express');
const router = express.Router();
const controllers = require('../controllers/market.controller');

router.get('/', controllers.market_main_get);
router.post('/', controllers.market_main_post);

module.exports = router;