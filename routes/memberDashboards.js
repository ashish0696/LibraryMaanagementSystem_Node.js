const express = require('express');
const router = express.Router();
const memberDashboardController = require('../controllers/memberDashboard.js');
const { checkAuthJWT } = require('../middleware/authMiddleware');

router.get('/available-books', checkAuthJWT, memberDashboardController.getAvailableBooks);
router.get('/my-book-issues', checkAuthJWT, memberDashboardController.myBookIssues);

module.exports = router;