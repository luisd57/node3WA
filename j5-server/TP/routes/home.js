const express = require('express');
const router = express.Router();
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const dayjs = require('dayjs');
const locale = require('../locale/fr')
const students = require('../Data/students');

const formattedDate = dayjs().locale(locale.name).format(locale.formats.LL);

router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'view', 'home.ejs'), 'utf-8', (err, content) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const renderedContent = ejs.render(content, { students, dayjs });
    res.send(renderedContent);
  });
});

router.get('/students', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'view', 'students.ejs'), 'utf-8', (err, content) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const renderedContent = ejs.render(content, { students, dayjs, formattedDate });
    res.send(renderedContent);
  });
});

module.exports = router;
