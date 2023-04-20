const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const students = [{ name: "Sonia" }, { name: "Antoine" }];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  if (url === "bootstrap") {
    res.writeHead(200, { "Content-Type": "text/css" });
    const css = fs.readFileSync("./assets/css/bootstrap.min.css");
    res.write(css);
    res.end();

    return;
  }

  if (url === "users") {
    res.writeHead(200, { "Content-Type": "text/html" });

    let users = "<ul>";
    for (const { name } of students) {
      users += `<li>${name}</li>`;
    }
    users += "</ul>";

    res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Ajoutez un utilisateur</title>
            </head>
            <body>
              ${users}
              <p><a href="http://${hostname}:${port}">Home</a></p>
            </body>
        </html>
      `);
  }

  if (req.method === "POST") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });

    // On écoute maintenant la fin de l'envoi des données avec la méthode on et l'attribut end
    req.on("end", () => {
      console.log(body)
      const replacer = new RegExp(/\+/, "g");
      console.log(replacer)

      const name = body.toString().split(/=/).pop().replace(replacer, ' ');
      console.log(name)
      
      if (name) students.push({ name });
      // redirection le code 301 indique une redirection permamente
      res.writeHead(301, { Location: `http://${hostname}:${port}` });
      res.end();
    });
  }

  if (url === "") {
    console.log('home')
    const home = fs.readFileSync("./views/home.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(home);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
