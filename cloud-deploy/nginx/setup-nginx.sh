#!/bin/bash

# Install Nginx if not already installed
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    sudo yum install -y nginx
fi

# Create directories
sudo mkdir -p /etc/nginx/conf.d
sudo mkdir -p /etc/nginx/ssl
sudo mkdir -p /var/log/nginx

# Generate self-signed certificate if it doesn't exist
if [ ! -f /etc/nginx/ssl/nginx.crt ]; then
    echo "Generating SSL certificate..."
    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/nginx.key \
        -out /etc/nginx/ssl/nginx.crt \
        -subj "/CN=79.76.48.165"
fi

# Copy Nginx configuration
sudo cp ~/music-analytics/nginx/music-analytics.conf /etc/nginx/conf.d/

# Test and reload Nginx
sudo nginx -t && sudo systemctl restart nginx
sudo systemctl enable nginx

# Open firewall ports if needed
if command -v firewall-cmd &> /dev/null; then
    sudo firewall-cmd --permanent --add-service=http
    sudo firewall-cmd --permanent --add-service=https
    sudo firewall-cmd --reload
fi

echo "Nginx setup completed successfully"
