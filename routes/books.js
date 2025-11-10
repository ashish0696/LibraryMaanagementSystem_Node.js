const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { validateCreateBook, validateUpdateBook, validateBookId } = require('../validation/books.validation');
const {checkAuthJWT} = require('../middleware/authMiddleware');
const {roleMiddleware} = require('../middleware/roleMiddleware');

router.post('/', checkAuthJWT, roleMiddleware(['librarian','superAdmin']), validateCreateBook, bookController.createBook);

router.put('/:id', checkAuthJWT, roleMiddleware(['librarian','superAdmin']), validateBookId, validateUpdateBook, bookController.updateBook);

router.get('/:id', checkAuthJWT, roleMiddleware(['librarian','superAdmin']), validateBookId, bookController.getBookById);

router.get('/', checkAuthJWT, roleMiddleware(['librarian','superAdmin']), bookController.getAllBooks);

router.delete('/:id', checkAuthJWT, roleMiddleware(['librarian','superAdmin']), validateBookId, bookController.deleteBook);

module.exports = router;