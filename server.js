const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const init = require('./plugins/init.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server inside async function to use await
async function start() {
    await init(app, __dirname);

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

start();
