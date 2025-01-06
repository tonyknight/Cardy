const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Add specific route for icon-index.json
app.get('/assets/icon-index.json', (req, res) => {
    const filePath = path.join(__dirname, 'assets', 'icon-index.json');
    try {
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).send('Icon index not found');
        }
    } catch(err) {
        res.status(500).send('Error reading icon index');
    }
});

// Add specific route for cardy.json
app.get('/cardy.json', (req, res) => {
    const filePath = path.join(__dirname, 'cardy.json');
    try {
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).send('No saved dashboard found');
        }
    } catch(err) {
        res.status(500).send('Error reading dashboard data');
    }
});

// Start the server
const server = app.listen(port, () => {
    console.log(`Cardy server running at http://localhost:${port}`);
    
    // Open the default browser
    const url = `http://localhost:${port}`;
    const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
    exec(`${start} ${url}`);
});

// Handle server shutdown
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Cardy server stopped');
        process.exit(0);
    });
}); 