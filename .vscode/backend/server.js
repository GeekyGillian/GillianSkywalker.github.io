
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Endpoint to fetch JSON data
app.get('/api/data', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Could not read data' });
        } else {
            res.send(JSON.parse(data));
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});