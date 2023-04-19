const http = require('http');
const fs = require('fs');
const url = require('url');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    if (method === 'GET' && path === '/') {
        res.setHeader('Content-Type', 'text/html');
        const menu = await readCsv();
        res.end(menu);
    } else if (method === 'PUT' && path.startsWith('/carte/')) {
        const id = path.slice(7);
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const updatedItem = JSON.parse(body);
            const success = await updateCsv(id, updatedItem);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success }));
        });
    } else if (method === 'DELETE' && path.startsWith('/carte/')) {
        const id = path.slice(7);
        const success = await deleteCsv(id);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success }));
    } else if (method === 'POST' && path === '/carte') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const newItem = JSON.parse(body);
            const success = await addCsv(newItem);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success }));
        });
    } else {
        res.statusCode = 404;
        res.end('Route not found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function readCsv() {
    return new Promise((resolve, reject) => {
        let menu = '';
        fs.createReadStream('menu.csv')
            .pipe(csv())
            .on('data', row => {
                menu += `<p>${row.id} - ${row.nom} - ${row.description} - ${row.prix} - ${row.categorie}</p>`;
            })
            .on('end', () => {
                resolve(menu);
            })
            .on('error', err => {
                reject(err);
            });
    });
}

async function updateCsv(id, updatedItem) {
    try {
        const items = [];
        const parser = fs.createReadStream('menu.csv').pipe(csv());
        for await (const row of parser) {
            if (row.id == id) {
                items.push(updatedItem);
            } else {
                items.push(row);
            }
        }
        await writeCsv(items);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function deleteCsv(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const items = [];
            const parser = fs.createReadStream('menu.csv').pipe(csv());
            for await (const row of parser) {
                if (row.id !== id) {
                    items.push(row);
                }
            }
            await writeCsv(items);
            resolve(true);
        } catch (err) {
            console.error(err);
            reject(false);
        }
    });
}

async function addCsv(newItem) {
    try {
        const items = [];
        const parser = fs.createReadStream('menu.csv').pipe(csv());
        for await (const row of parser) {
            items.push(row);
        }
        items.push(newItem);
        await writeCsv(items);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function writeCsv(items) {
    return new Promise((resolve, reject) => {
        const csvWriter = createObjectCsvWriter({
            path: 'menu.csv',
            header: [
                { id: 'id', title: 'id' },
                { id: 'nom', title: 'nom' },
                { id: 'description', title: 'description' },
                { id: 'prix', title: 'prix' },
                { id: 'categorie', title: 'categorie' },
            ],
        });
        csvWriter
            .writeRecords(items)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}