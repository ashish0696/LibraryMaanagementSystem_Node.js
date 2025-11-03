const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { validateCreateBook, validateUpdateBook, validateBookId } = require('../validation/books.validation');
const {checkAuthJWT} = require('../middleware/authMiddleware');

router.post('/', checkAuthJWT, validateCreateBook, bookController.createBook);

router.put('/:id', checkAuthJWT, validateBookId, validateUpdateBook, bookController.updateBook);

router.get('/:id', checkAuthJWT, validateBookId, bookController.getBookById);

router.get('/', checkAuthJWT, bookController.getAllBooks);

router.delete('/:id', checkAuthJWT, validateBookId, bookController.deleteBook);

module.exports = router;