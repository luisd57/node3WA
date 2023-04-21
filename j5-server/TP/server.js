const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const dayjs = require('dayjs');
const locale = require('./locale/fr')
const url = require('url');
const { addStudent, removeStudent } = require('./utils');
const students = require('./Data/students');
require('dotenv').config();

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const formattedDate = dayjs().locale(locale.name).format(locale.formats.LL)

    if (pathname === '/' || pathname === '/home') {
        fs.readFile(path.join(__dirname, 'view', 'home.ejs'), 'utf-8', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            const renderedContent = ejs.render(content, { students, dayjs });
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(renderedContent);
        });
    } else if (pathname === '/students') {
        fs.readFile(path.join(__dirname, 'view', 'students.ejs'), 'utf-8', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            const renderedContent = ejs.render(content, { students, dayjs, formattedDate });
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(renderedContent);
        });
    } else if (pathname === '/addStudent' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { name, birth } = JSON.parse(body);
            addStudent(students, { name, birth });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        });
    } else if (pathname.startsWith('/removeStudent') && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { name } = JSON.parse(body);
            removeStudent(students, name);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        });
    } else if (pathname.startsWith('/css')) {
        fs.readFile(path.join(__dirname, 'assets', pathname), (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const port = process.env.APP_PORT;
const host = process.env.APP_LOCALHOST;
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
