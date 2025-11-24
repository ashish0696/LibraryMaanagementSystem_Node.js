const express = require('express');
const router = express.Router();
const {roleMiddleware} = require('../middleware/roleMiddleware');

const bookIssueController = require('../controllers/bookIssueController');
const { checkAuthJWT } = require('../middleware/authMiddleware');
const { validateRequestBook, validateApproveBody, validateIssueId } = require('../validation/bookIssue.Validation');

router.post('/request', checkAuthJWT, roleMiddleware(['member']), validateRequestBook, bookIssueController.requestBook);
router.post('/return/:id', checkAuthJWT, roleMiddleware(['member']), validateIssueId, bookIssueController.returnBook);
router.get('/daily', checkAuthJWT, roleMiddleware(['librarian','superAdmin']), bookIssueController.viewDailyIssuedBooks);
router.get('/', checkAuthJWT, roleMiddleware(['librarian']), bookIssueController.viewAllIssuedBooks);
router.post('/:id', checkAuthJWT, roleMiddleware(['librarian']), validateIssueId, validateApproveBody, bookIssueController.issueBook);
router.get('/user', checkAuthJWT, roleMiddleware(['member']), bookIssueController.getIssuesByUser);
router.get('/count', checkAuthJWT, roleMiddleware(['librarian','superAdmin']), bookIssueController.countIssuedBooks);

module.exports = router;