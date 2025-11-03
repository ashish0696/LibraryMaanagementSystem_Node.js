const express = require('express');
const router = express.Router();
const adminDashBoardComtroller = require('../controllers/adminDashBoardComtroller.js');
const { checkAuthJWT } = require('../middleware/authMiddleware');


router.get('/stats', checkAuthJWT, adminDashBoardComtroller.getDashboardStats);
module.exports = router;