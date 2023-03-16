const express = require('express');
const router = express.Router();
const controllers = require('../controllers/post.controller');

router.get('/', controllers.post_main_get);
router.get('/:id', controllers.post_mainById_get);
router.post('/', controllers.post_main_post);

module.exports = router;