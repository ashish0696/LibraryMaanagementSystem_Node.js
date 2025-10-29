const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./config/dbConfig.js');
const models = require('./models/index.js'); // ensures associations
const routes = require('./routes/index.js');

const app = express();
app.use(bodyParser.json());

// Minimal auth stub for demo/testing: set req.user based on Authorization header
app.use((req, res, next) => {
  const auth = req.headers['authorization'];
  if (auth === 'demo-admin') req.user = { role: 'admin', user_id: 'demo-admin' };
  else if (auth === 'demo-member') req.user = { role: 'member', user_id: 'demo-member' };
  next();
});

app.use('/api', routes);

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
