# Cardy: Self-Contained Dashboard

Cardy is a lightweight, self-contained dashboard for organizing and accessing your web services. It features a clean, responsive interface with support for service icons, dark mode, and easy organization through sections.

## Features

- 🎯 Self-contained in a single HTML file
- 🌙 Dark mode support
- 🎨 Built-in icon search for popular web services
- 📱 Responsive design with auto-sizing cards
- 🗂️ Organize services into sections
- 💾 Save/load dashboard configurations
- 🖼️ Support for both SVG icons and custom image URLs

## Requirements

### Basic Usage
- Modern web browser
- Web server (any type that can serve static files)

### Optional Development Server
- Node.js
- Express.js (installed automatically)

## Quick Start

### Using with Existing Web Server
1. Copy `index.html` and the `assets` folder to your web server
2. Access the page through your web server's URL

### Using the Built-in Development Server
1. Clone this repository
2. Run: node start
2. Open localhost:3000

## Creating Your Dashboard

### Initial Setup
1. Click the '+' button to create a new dashboard
2. Enter a dashboard title
3. The dashboard interface will appear with options to add sections

### Adding Sections
1. Use the "Add Section" form at the top of the page
2. Enter a section name (e.g., "Infrastructure", "Media", "Monitoring")
3. Click "Add" to create the section

### Adding Service Cards
1. In each section, click the three-dot menu (⋮) and select "Add Card"
2. Fill in the service details:
   - Service Name: Name of your service
   - Service URL: Full URL or IP address (http:// will be added if needed)
   - Service Icon: Two options:
     - Search for built-in icons by typing the service name
     - Enter a URL to a custom icon

### Managing Your Dashboard

#### Using the Dashboard Menu
Click the chevron (▼) next to your dashboard title to:
- Edit the dashboard title
- Toggle dark mode
- Save your configuration

#### Editing Sections and Cards
Each section and card has a menu (⋮) for:
- Edit: Modify name/details
- Remove: Delete the section/card
- Additional options specific to sections/cards

## Working with cardy.json
All the data from the dashboard is saved as a 'cardy.json' file and includes the embedded SVG icons. Each time you make a change to the Cardy dashboard, you must save the dashboard to update the 'cardy.json' file which will be downloaded. Add this file along with the 'index.html' file to your web server to load the dashboard.

### Saving Your Dashboard
1. Click the dashboard menu (▼)
2. Select "Save Dashboard"
3. A `cardy.json` file will be downloaded
4. Place this file in the same directory as `index.html`

### Loading a Saved Dashboard
- Simply place your `cardy.json` file alongside `index.html`
- The dashboard will automatically load when you access the page

### Manual JSON Editing
You can manually edit `cardy.json` to quickly add or modify services. The file structure is:

```json
json
{
"title": "My Dashboard",
"sections": [
{
"id": "section_1",
"name": "Infrastructure",
"cards": [
{
"id": "card_1_1",
"title": "Portainer",
"link": "http://192.168.1.100:9000",
"icon": {
"type": "svg",
"value": "<!-- SVG content -->"
}
}
]
}
]
}
```

Tips for manual editing:
- Section IDs follow the pattern: `section_1`, `section_2`, etc.
- Card IDs follow the pattern: `card_1_1` (first card in first section)
- Keep IDs unique and sequential
- URLs can be full URLs or IP addresses with ports

## Customization

### Card Size
Cards automatically resize based on screen width. The default minimum card width is 100px. To adjust this, modify the `grid-template-columns` value in the CSS:

```css
css
.cards-container {
grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
```

## Browser Support
Cardy works best with modern browsers that support:
- CSS Grid
- CSS Custom Properties (variables)
- Modern JavaScript features

## License
MIT License - Feel free to use and modify as needed.