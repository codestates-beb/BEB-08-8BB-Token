const express = require('express');
const router = express.Router();

const main = require('./main.route')
const user = require('./user.route');
const post = require('./post.route');
const market = require('./market.route');

router.use('/', main);
router.use('/user', user);
router.use('/post', post);
router.use('/market', market);

module.exports = router;