const bookIssueService = require('../services/bookIssueService.js');

const requestBook = async (req, res) => {
    try {
        const { bookId, returnDate } = req.body;
        const userId = req.user.id;
        const bookIssue = await bookIssueService.requestBook(bookId, userId, returnDate);
        res.status(201).json(bookIssue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }   
};

const issueBook = async (req, res) => {
    try {
        const issueId = req.params.id;
        const { approve } = req.body;
        const bookIssue = await bookIssueService.issueBook(issueId, approve);
        res.status(200).json(bookIssue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const viewAllIssuedBooks = async (req, res) => {
    try {
        const bookIssues = await bookIssueService.viewAllBookIssues();
        res.status(200).json(bookIssues);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const viewDailyIssuedBooks = async (req, res) => {
    try {
        const { date } = req.query;
        const bookIssues = await bookIssueService.viewDailyIssuedBooks(date);
        res.status(200).json(bookIssues);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    // console.log("in bookIssue Controller, Daily Issued Books");

};

const returnBook = async (req, res) => {
    try {
        const issueId = req.params.id;
        const bookIssue = await bookIssueService.returnBook(issueId);
        res.status(200).json(bookIssue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    requestBook,
    issueBook,
    viewBookIssuedByUser,
    viewAllIssuedBooks,
    viewDailyIssuedBooks,
    returnBook
};