require('dotenv').config();
const { Sequelize } = require('sequelize');

const {
  DB_NAME = 'LibraryManagement',
  DB_USER = 'postgres',
  DB_PASSWORD = 'root',
  DB_HOST = 'localhost',
  DB_PORT = 5432,
  DB_DIALECT = 'postgres',
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
});

module.exports = { sequelize, Sequelize };
