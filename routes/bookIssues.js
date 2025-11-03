const express = require('express');
const router = express.Router();

const bookIssueController = require('../controllers/bookIssueController');
const { checkAuthJWT } = require('../middleware/authMiddleware');
const { validateRequestBook, validateApproveBody, validateIssueId } = require('../validation/bookIssue.Validation');
router.post('/request', checkAuthJWT, validateRequestBook, bookIssueController.requestBook);
router.post('/return/:id', checkAuthJWT, validateIssueId, bookIssueController.returnBook);
router.get('/daily', checkAuthJWT, bookIssueController.viewDailyIssuedBooks);
router.get('/', checkAuthJWT, bookIssueController.viewAllIssuedBooks);
router.post('/:id', checkAuthJWT, validateIssueId, validateApproveBody, bookIssueController.issueBook);

module.exports = router;