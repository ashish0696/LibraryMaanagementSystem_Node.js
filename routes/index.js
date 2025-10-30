const express = require('express');
const router = express.Router();

router.use('/users', require('./users.js'));
router.use('/book', require('./books.js'));

module.exports = router;