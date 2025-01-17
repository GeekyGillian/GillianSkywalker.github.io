async function fetchData(endpoint, elementId) {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const listContainer = document.getElementById(elementId);
        data.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <h3>${item.title || item.name || ''}</h3>
                <p>${item.description || ''}</p>
                <img src="${item.poster || item.image || ''}" alt="${item.title || item.name || ''}" style="width: 100px;">
            `;
            listContainer.appendChild(itemElement);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData('/api/movies', 'movie-list');
    fetchData('/api/news', 'news-list');
    fetchData('/api/shop-items', 'shop-list');
});

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs'); // Require the filesystem module
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route for serving the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example API endpoint to get movie data from movies.json
app.get('/api/movies', (req, res) => {
    fs.readFile(path.join(__dirname, 'movies.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading movies data' });
        }
        res.json(JSON.parse(data)); // Parse and return JSON data
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});