const bookIssueService = require('../services/bookIssueService.js');
const logger = require("../utils/logger.js");
const bookService = require('../services/bookService.js');

const requestBook = async (req, res) => {
    try {
        const { bookId, returnDate } = req.body;
        const userId = req.user.id;
        const book = await bookService.getBookById(bookId);
        const bookIssue = await bookIssueService.requestBook(bookId, userId, returnDate);
        logger.info(`Book requested successfully: '${book.title}' by user: ${userId}`);

    res.sendResponse(bookIssue, 'Book requested', true, 201);

    } catch (error) {
        res.sendError(error.message, 400);
    }   
};

const issueBook = async (req, res) => {
    try {
        const issueId = req.params.id;
        const { approve } = req.body;
        const bookIssue = await bookIssueService.issueBook(issueId, approve);
        logger.info(`Book issued successfully with ID: '${issueId}' with approval: ${approve}`);

        res.sendResponse(bookIssue, 'Book issue updated', true, 200);
    } catch (error) {
        res.sendError(error.message, 400);
    }
};


const viewAllIssuedBooks = async (req, res) => {
    try {
        const bookIssues = await bookIssueService.viewAllBookIssues();
        res.sendResponse(bookIssues, 'Issued books', true, 200);
    } catch (error) {
        res.sendError(error.message, 400);
    }
};

const viewDailyIssuedBooks = async (req, res) => {
    try {
        const { date } = req.query;
        const bookIssues = await bookIssueService.viewDailyIssuedBooks(date);
        res.sendResponse(bookIssues, 'Daily issued books', true, 200);
    } catch (error) {
        res.sendError(error.message, 400);
    }
    // console.log("in bookIssue Controller, Daily Issued Books");

};

const returnBook = async (req, res) => {
    try {
        const issueId = req.params.id;
        const bookIssue = await bookIssueService.returnBook(issueId);
        logger.info(`Book returned successfully with ID: '${issueId}'`);
        res.sendResponse(bookIssue, 'Book returned', true, 200);
    } catch (error) {
        res.sendError(error.message, 400);
    }
};
const getIssuesByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) return res.sendError('Authentication required', 401);
        const bookIssues = await bookIssueService.viewUserBookIssues(userId);
        res.sendResponse(bookIssues, 'User issued books', true, 200);
    } catch (error) {
        res.sendError(error.message, 400);
    }
};

const countIssuedBooks = async (req, res) => {
    try {
        const count = await bookIssueService.getTotalIssuedBooksCount();
        res.sendResponse({ count }, 'Total issued books count', true, 200);
    } catch (error) {
        res.sendError(error.message, 400);
    }
};

module.exports = {
    requestBook,
    issueBook,
    viewAllIssuedBooks,
    viewDailyIssuedBooks,
    returnBook,
    getIssuesByUser,
    countIssuedBooks
};