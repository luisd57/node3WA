// server.js
const http = require("http");
const users = require("./users");
const shuffle = require("./src/utils");
const hostname = 'localhost';
const port = '8080';

const server = http.createServer((req, res) => {
    const url = req.url.replace('/', '');

    if (url === 'favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }

    if (url === 'shuffle') {
        shuffle(users);
    }

    res.writeHead(200, {
        "Content-Type": "text/html",
    });

    let userList = users.map(user => `<li>${user}</li>`).join('');
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Exercice Shuffle</title>
        </head>
        <body>
          <h1>Liste des utilisateurs</h1>
          <ul>
            ${userList}
          </ul>
        </body>
        </html>
    `);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
