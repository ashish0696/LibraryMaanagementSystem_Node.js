const BookIssue = require('../models/bookIssue.js');
const { Op } = require('sequelize');

const requestBook = async (bookId, userId, returnDate) => {
    let parsedReturn = null;
    if (returnDate !== undefined && returnDate !== null && returnDate !== '') {
        if (/^\d{4}-\d{2}-\d{2}$/.test(returnDate)) {
            const parts = returnDate.split('-').map(Number);
            parsedReturn = new Date(parts[0], parts[1] - 1, parts[2]);
        } else {
            parsedReturn = new Date(returnDate);
        }
        if (isNaN(parsedReturn.getTime())) {
            throw new Error('Invalid returnDate format');
        }
    } else {
        parsedReturn = new Date();
    }

    const bookIssue = await BookIssue.create({
        book_id: Number(bookId),
        user_id: userId,
        issue_date: new Date(),
        return_date: parsedReturn,
        status: 'requested',
    });
    return bookIssue;
}

const issueBook = async (issueId, approve) => {
    const bookIssue = await BookIssue.findByPk(issueId);
    if (!bookIssue) {
        throw new Error('Book issue request not found');
    }
    if (approve) {
        bookIssue.status = 'issued';
        bookIssue.issue_date = new Date();
    } else {
        bookIssue.status = 'rejected';
    }
    await bookIssue.save();
    return bookIssue;
}

const viewUserBookIssues = async (userId) => {
    const bookIssues = await BookIssue.findAll({ where: { user_id: userId } });
    return bookIssues;
}

const getTotalIssuedBooksCount = async () => {
    const count = await BookIssue.count({
        where: {
            status: 'issued'
        }
    });
    return count;
}

const getOverdueBooksCount = async () => {
    const today = new Date();
    const count = await BookIssue.count({
        where: {
            status: 'overdue',
            return_date: {
                [Op.lt]: today
            }
        }
    });
    return count;
}

const viewAllBookIssues = async () => {
    const bookIssues = await BookIssue.findAll();
    return bookIssues;
}


const returnBook = async (issueId) => {
    const bookIssue = await BookIssue.findByPk(issueId);
    if (!bookIssue) {
        throw new Error('Book issue request not found');
    }
    const planned = bookIssue.return_date ? new Date(bookIssue.return_date) : null;
    const actualReturn = new Date();
    let status = 'returned';
    if (planned) {
        const plannedMid = new Date(planned.getFullYear(), planned.getMonth(), planned.getDate());
        const todayMid = new Date(actualReturn.getFullYear(), actualReturn.getMonth(), actualReturn.getDate());
        if (plannedMid < todayMid) {
            status = 'overdue';
        } else {
            status = 'returned';
        }
    }
    bookIssue.status = status;
    bookIssue.return_date = actualReturn;
    await bookIssue.save();
    return bookIssue;
};


const viewDailyIssuedBooks = async (date) => {
    const target = date ? new Date(date) : new Date();
    const start = new Date(target);
    start.setHours(0, 0, 0, 0);
    const end = new Date(target);
    end.setHours(23, 59, 59, 999);
    // console.log("in bookIssue Service, Daily Issued Books", start, end);
    const bookIssues = await BookIssue.findAll({
        where: {
            issue_date: {
                [Op.between]: [start, end]
            }
        }
    });
    return bookIssues;
};


module.exports = {
    requestBook,
    issueBook,
    viewUserBookIssues,
    viewAllBookIssues,
    viewDailyIssuedBooks,
    returnBook,
    getTotalIssuedBooksCount,
    getOverdueBooksCount
};
