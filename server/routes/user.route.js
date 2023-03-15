const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user.controller');

router.get('/', controllers.user_main_get);
router.post('/join', controllers.user_join_post);

module.exports = router;