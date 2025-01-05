#!/bin/bash

# Output file
OUTPUT="icon-index.json"

# Initialize JSON structure
echo '{
    "icons": [' > "$OUTPUT"

# Function to get keywords for known services
get_keywords() {
    local service=$1
    case $service in
        "portainer")
            echo '["docker", "container", "management", "infrastructure"]'
            ;;
        "plex")
            echo '["media", "streaming", "server", "entertainment"]'
            ;;
        "nginx")
            echo '["web", "server", "proxy", "reverse-proxy", "load-balancer"]'
            ;;
        "pihole")
            echo '["dns", "ad-blocking", "network", "filtering"]'
            ;;
        "homeassistant")
            echo '["home", "automation", "smart-home", "iot"]'
            ;;
        "grafana")
            echo '["monitoring", "metrics", "dashboard", "analytics", "visualization"]'
            ;;
        "prometheus")
            echo '["monitoring", "metrics", "time-series", "alerting"]'
            ;;
        "nextcloud")
            echo '["storage", "cloud", "file-sharing", "collaboration"]'
            ;;
        "jellyfin")
            echo '["media", "streaming", "server", "entertainment"]'
            ;;
        "emby")
            echo '["media", "streaming", "server", "entertainment"]'
            ;;
        "sonarr")
            echo '["tv", "media", "automation", "downloads"]'
            ;;
        "radarr")
            echo '["movies", "media", "automation", "downloads"]'
            ;;
        "transmission")
            echo '["torrent", "download", "peer-to-peer", "p2p"]'
            ;;
        "qbittorrent")
            echo '["torrent", "download", "peer-to-peer", "p2p"]'
            ;;
        *)
            echo "[]"
            ;;
    esac
}

# Process each SVG file
first=true
for file in *.svg; do
    # Skip if no SVG files found
    [ -e "$file" ] || continue
    
    # Get base name without extension and everything after first dash
    base_name=$(echo "$file" | sed -E 's/\.svg$//' | cut -d'-' -f1)
    
    # Add comma for all but first entry
    if [ "$first" = true ]; then
        first=false
    else
        echo "        ," >> "$OUTPUT"
    fi
    
    # Get keywords for this service
    keywords=$(get_keywords "$base_name")
    
    # Add entry to JSON
    echo "        {
            \"name\": \"$base_name\",
            \"keywords\": $keywords,
            \"path\": \"assets/$file\"
        }" >> "$OUTPUT"
done

# Close JSON structure
echo '    ]
}' >> "$OUTPUT"

echo "Generated $OUTPUT with $(grep -c "name" "$OUTPUT") icons" 