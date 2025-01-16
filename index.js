const express = require('express');

const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());

// Middleware to log requests
