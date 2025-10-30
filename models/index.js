const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/dbConfig.js');
const User = require('./user.js');
const Book = require('./book.js');



module.exports = {
    User,
    Book
};

