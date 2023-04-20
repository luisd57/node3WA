const http = require("http");
const fs = require("fs");
const url = require("url");

const students = [
    { name: "Sonia" },
    { name: "Antoine" }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    if (path === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        const homePage = fs.readFileSync("./views/home.html");
        res.write(homePage);
        res.end();
    } else if (req.method === "POST") {
        let body = "";
        req.on("data", (data) => {
            body += data;
        });

        req.on("end", () => {
            const newStudent = JSON.parse(body);
            students.push(newStudent);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ result: "success" }));
        });
    } else if (path === "/bootstrap") {
        res.writeHead(200, { "Content-Type": "text/css" });
        const css = fs.readFileSync("./assets/css/bootstrap.min.css");
        res.write(css);
        res.end();
    } else if (path.startsWith("/img/")) {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        const img = fs.readFileSync("./assets" + path);
        res.write(img);
        res.end();
    }
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
