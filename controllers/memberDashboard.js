const bookService = require('../services/bookService.js');
const issueService = require('../services/bookIssueService.js');


const getAvailableBooks = async (req, res) => {
    try {
        const books = await bookService.getAvailableBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const myBookIssues = async (req, res) => {
    try {
        const issuedBooks = await issueService.viewUserBookIssues(req.user.id);
        res.status(200).json(issuedBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAvailableBooks,
    myBookIssues
};