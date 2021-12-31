const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8011;

const static_dir = path.resolve(__dirname, './public');
const catalog_path = path.resolve(__dirname, '.data/showcase.json');
const cart_path = path.resolve(__dirname, '.data/cart.json');

app.use(express.static(static_dir));

app.get('/', (req, res) => {
    res.send('Hello NOdeJS')
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
