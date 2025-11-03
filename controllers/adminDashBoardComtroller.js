const bookService = require('../services/bookService.js');
const userService = require('../services/userService.js');
const issueService = require('../services/bookIssueService.js');

const getDashboardStats = async (req, res) => {
    try {
        const totalBooks = await bookService.getTotalBooksCount();
        const totalUsers = await userService.getTotalUsersCount();
        const totalIssuedBooks = await issueService.getTotalIssuedBooksCount();
        const overdueBooks = await issueService.getOverdueBooksCount();
        res.status(200).json({
            totalBooks,
            totalUsers,
            totalIssuedBooks,
            overdueBooks
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDashboardStats
};

