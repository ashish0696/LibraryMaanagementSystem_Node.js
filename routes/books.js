const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.get('/:id', bookController.getBookById);
router.get('/', bookController.getAllBooks);
router.delete('/:id', bookController.deleteBook);

module.exports = router;