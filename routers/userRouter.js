const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.post('/createUser', userController.createUser);
router.post('/findUser', userController.findUser);

module.exports = router;