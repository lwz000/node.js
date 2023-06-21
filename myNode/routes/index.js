var express = require('express');
var router = express.Router();
var user = require('../controllers/test')

// 用户
router.get('/user', user.getUser);

module.exports = router;