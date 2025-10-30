const Book = require('../models/book.js');

const createBook = async (bookData) => {
    const book = await Book.create({
        title: bookData.title,
        author: bookData.author,
        publisher: bookData.publisher,
        category: bookData.category,
        status: bookData.status || 'available',

    });
    return book;
}

const updateBook =  async (id, bookData) => {
    const book = await Book.findByPk(id);
    if (!book) {
        throw new Error('Book not found');
    }
    return book.update(bookData);
}


const getBookById = async (id) => {
    const book = await Book.findByPk(id);
    return book;
}

const getAllBooks = async () => {
    return await Book.findAll();
}


const deleteBook = async (id) => {
    const book = await Book.findByPk(id);
    if (!book) {
        throw new Error('Book not found');
    }
    await book.destroy();
    return book;
}

module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getBookById,
    getAllBooks
};

