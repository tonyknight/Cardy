const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Serve the HTML file with embedded data
app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, html) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        
        // Read the current dashboard data
        let dashboardData = [];
        try {
            dashboardData = JSON.parse(fs.readFileSync('dashboard-data.json', 'utf8'));
        } catch (e) {
            // If file doesn't exist or is invalid, use empty array
        }
        
        // Inject the data into the HTML
        const modifiedHtml = html.replace(
            'window.initialDashboardData = [];',
            `window.initialDashboardData = ${JSON.stringify(dashboardData)};`
        );
        
        res.send(modifiedHtml);
    });
});

// Save endpoint
app.post('/save-dashboard', (req, res) => {
    const dashboardData = req.body;
    
    // Save the data to a JSON file
    fs.writeFileSync('dashboard-data.json', JSON.stringify(dashboardData, null, 2));
    
    // Update the HTML file
    let html = fs.readFileSync('index.html', 'utf8');
    html = html.replace(
        /window\.initialDashboardData = \[.*?\];/s,
        `window.initialDashboardData = ${JSON.stringify(dashboardData)};`
    );
    fs.writeFileSync('index.html', html);
    
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
}); 