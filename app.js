const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./config/dbConfig.js');
const models = require('./models/index.js'); 
const routes = require('./routes/index.js');
const dotenv = require('dotenv');
const app = express();
app.use(bodyParser.json());

dotenv.config();
app.use('/api/v1', routes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connection established');
    await sequelize.sync({ alter: true });
    console.log('Models synchronized');
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start app', err);
    process.exit(1);
  }
};

start();
