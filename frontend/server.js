const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Function to read JSON data
function readDataFromFile() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
}

// Routes to get data
app.get('/api/movies', (req, res) => {
    const data = readDataFromFile();
    res.json(data.movies);
});

app.get('/api/news', (req, res) => {
    const data = readDataFromFile();
    res.json(data.news);
});

app.get('/api/shop-items', (req, res) => {
    const data = readDataFromFile();
    res.json(data.shopItems);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});