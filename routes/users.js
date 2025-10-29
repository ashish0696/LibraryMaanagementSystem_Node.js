const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.delete('/:id', userController.removeUser);

module.exports = router;
