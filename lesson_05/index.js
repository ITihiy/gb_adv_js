const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8011;

const static_dir = path.resolve(__dirname, './public');
const catalog_path = path.resolve(__dirname, './data/showcase.json');
const cart_path = path.resolve(__dirname, './data/cart.json');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static(static_dir));
app.use(express.json());

app.get('/api/v1/showcase', async (req, res) => {
   try {
       const data = await fs.promises.readFile(catalog_path, 'utf-8');
       res.send(data);
   } catch (e) {
       res.status(500).send(e);
   }
});

app.get('/api/v1/cart', async (req, res) => {
   try {
       const data = await fs.promises.readFile(cart_path, 'utf-8');
       res.send(data);
   } catch (e) {
       res.status(500).send(e);
   }
});

app.post('/api/v1/cart', async (req, res) => {
    try {
        const data = await fs.promises.readFile(cart_path, 'utf-8');
        const json_data = JSON.parse(data);
        json_data.push(req.body);
        await fs.promises.writeFile(cart_path, JSON.stringify(json_data), 'utf-8');
        res.status(201).send();
   } catch (e) {
       res.status(500).send(e);
   }
});

app.delete('/api/v1/cart', async (req, res) => {
    try {
        const data = await fs.promises.readFile(cart_path, 'utf-8');
        const json_data = JSON.parse(data);
        const idx = json_data.findIndex((good) => good.id === req.body.id);
        json_data.splice(idx, 1);

        await fs.promises.writeFile(cart_path, JSON.stringify(json_data), 'utf-8');
        await res.status(200).send();
   } catch (e) {
       res.status(500).send(e);
   }
});


app.get('/', (req, res) => {
    res.send('Hello NodeJS')
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
