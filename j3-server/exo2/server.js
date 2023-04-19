const http = require("http");
const fs = require("fs");
const hostname = 'localhost';
const port = '8080';

const data = JSON.parse(fs.readFileSync("Data/all.json", "utf-8"));
const students = data.students;

const server = http.createServer((req, res) => {
    const urlParts = req.url.split("/");
    const path = urlParts[1];

    if (path === 'favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }

    if (path === 'all') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(students));
        return;
    }

    if (path === 'search') {
        const studentName = urlParts[2];
        const student = students.find(s => s.name === studentName);

        if (student) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(student));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("Student not found.");
        }
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Page not found.");
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
