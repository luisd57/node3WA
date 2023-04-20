const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const menuItems = [
  { path: '/', title: 'Home', isActive: true },
  { path: '/about-me', title: 'About', isActive: false },
  { path: '/references', title: 'References', isActive: false },
  { path: '/contact-me', title: 'Contact', isActive: false },
];

app.get('/', (req, res) => {
  res.render('index', { menuItems });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
