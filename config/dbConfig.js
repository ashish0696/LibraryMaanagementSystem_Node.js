const { Sequelize } = require('sequelize');

// Database configuration (as provided)
const sequelize = new Sequelize('LibraryManagement', 'postgres', 'root', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

module.exports = { sequelize, Sequelize };
