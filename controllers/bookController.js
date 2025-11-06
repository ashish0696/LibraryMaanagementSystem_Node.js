const bookService = require('../services/bookService.js');
const {logger} = require('../utils/logger.js');
const createBook = async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        logger.info(`Book created successfully: '${book.title}'`);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({error: error.message });
    }
}

const updateBook = async (req, res) => {
    try {
        const book = await bookService.updateBook(req.params.id, req.body);
        logger.info(`Book updated successfully: '${book.title}'`);

        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({error: error.message });
    }
}

const getBookById = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({error: error.message });
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({error: error.message });
    }
}

const deleteBook = async (req, res) => {
    try {
        await bookService.deleteBook(req.params.id);
        logger.info(`Book deleted successfully with ID: '${req.params.id}'`);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({error: error.message });
    }
}

module.exports = {
    createBook,
    updateBook,
    getBookById,
    getAllBooks,
    deleteBook
};