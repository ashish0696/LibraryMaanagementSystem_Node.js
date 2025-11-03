const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
	validateCreateUser,
	validateUpdateUser,
	validateUserId,
} = require('../validation/users.validation');
const {checkAuthJWT} = require('../middleware/authMiddleware');


router.post('/', validateCreateUser, userController.createUser);

router.put('/:id', checkAuthJWT, validateUserId, validateUpdateUser, userController.updateUser);

router.get('/:id', checkAuthJWT, validateUserId, userController.getUserById);

router.get('/', checkAuthJWT, userController.getAllUsers);

router.delete('/:id', checkAuthJWT, validateUserId, userController.removeUser);

module.exports = router;
