const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.post('/createUser', userController.createUser);
router.post('/findUser', userController.findUser);
router.get('/getAllUsers', userController.getAllUsers);

module.exports = router;