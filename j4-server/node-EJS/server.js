const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

function render(filename, data, response) {
    ejs.renderFile(`./views/${filename}.ejs`, data, {}, (err, str) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Erreur interne du serveur');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(str);
        }
    });
}

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        fs.readFile('./annonces.txt', 'utf-8', (err, data) => {
            if (err) throw err;

            const lines = data.split('\n').filter((line) => line.trim() !== '');
            const annonces = [];

            for (let i = 0; i < lines.length; i += 3) {
                const titre = lines[i];
                const description = lines[i + 1];
                const prix = lines[i + 2].replace('Prix : ', '').replace('€', '');
                annonces.push({ titre, description, prix });
            }

            render('index', { annonces }, res);
        });
    } else if (req.url === '/about' && req.method === 'GET') {
        render('about', {}, res);
    } else if (req.url === '/contact' && req.method === 'GET') {
        render('contact', {}, res);
    } else if (req.url === '/thankyou' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { nom, email, message } = JSON.parse(body);
            render('thankyou', { nom, email, message }, res);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page non trouvée');
    }
});

server.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
});
