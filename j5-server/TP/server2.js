const express = require('express');
const app = express();
const studentsRouter = require('./routes/students');
const homeRouter = require('./routes/home');
require('dotenv').config();

app.use(express.json());
app.use('/', homeRouter);
app.use('/students', studentsRouter);

const port = process.env.APP_PORT;
const host = process.env.APP_LOCALHOST;
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
