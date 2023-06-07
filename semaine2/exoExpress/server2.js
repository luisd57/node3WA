const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const API_URL = 'https://fakestoreapi.com/products';
const DB_PATH = './db.json';
const PORT = 3000;

// helpers 
const getStock = () => JSON.parse(fs.readFileSync(DB_PATH));
const writeStock = (stock) => fs.writeFileSync(DB_PATH, JSON.stringify(stock, null, 2));

const getProductById = (id) => getStock().find(product => product.id === id);
const productExists = (id) => getProductById(id) !== undefined;

const init = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  writeStock(data);
}

init();

// 1 get products
app.get('/products', (req, res) => {
  const stock = getStock();
  res.status(200).json({ stock, message: 'Products successfully fetched.' });
});

// 2 get a product 
app.get('/products/:id', (req, res) => {
  const productID = parseInt(req.params.id);
  const product = getProductById(productID);
  if (product) {
    res.status(200).json({ product, message: `Product with id ${productID} found.` });
  } else {
    res.status(404).json({ message: `Product with id ${productID} not found.` });
  }
});

// 3 add a product
app.post('/products', (req, res) => {
  const stock = getStock();
  const product = req.body;
  product.id = Math.max(...stock.map(p => p.id)) + 1;
  stock.push(product);
  writeStock(stock);
  res.status(201).json({ product, message: `Product with id ${product.id} created.` });
});

// 4 update a product
app.put('/products/:id', (req, res) => {
  const productID = parseInt(req.params.id);
  const stock = getStock();
  const product = stock.find(p => p.id === productID);
  if (productExists(productID)) {
    Object.assign(product, req.body);
    writeStock(stock);
    res.status(200).json({ product, message: `Product with id ${productID} successfully updated.` });
  } else {
    res.status(404).json({ message: `Product with id ${productID} not found.` });
  }
});

// 5 delete a product
app.delete('/products/:id', (req, res) => {
  const productID = parseInt(req.params.id);
  const stock = getStock();
  if (productExists(productID)) {
    const index = stock.findIndex(product => product.id === productID);
    const product = stock.splice(index, 1);
    writeStock(stock);
    res.status(200).json({product, message: `Product with id ${productID} deleted.`});
  } else {
    res.status(404).json({ message: `Product with id ${productID} not found.` });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
