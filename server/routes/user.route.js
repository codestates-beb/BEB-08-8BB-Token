const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user.controller');

router.get('/', controllers.user_main_get);
router.post('/join', controllers.user_join_post);
router.get('/join/:nickname', controllers.user_joinById_get);
router.post('/login', controllers.user_login_post);
router.post('/logout', controllers.user_logout_post);
router.post('/faucet',controllers.user_faucet_post);
router.post('/transfer', controllers.user_transfer_post);

module.exports = router;