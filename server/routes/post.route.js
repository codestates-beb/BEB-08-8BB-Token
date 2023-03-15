const express = require('express');
const router = express.Router();
const controllers = require('../controllers/post.controller');

router.get('/', controllers.post_main_get);

module.exports = router;