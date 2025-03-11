#!/bin/bash

echo "===== Music Analytics Platform Deployment ====="

# Check and install Docker if not installed
echo "Installing Docker if not already installed..."
if ! command -v docker &> /dev/null; then
    sudo yum install -y yum-utils
    sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
    echo "Docker installed. Please log out and log back in for group changes to take effect."
    echo "Then run this script again."
    exit 1
fi

# Check Docker status
if ! sudo systemctl is-active --quiet docker; then
    sudo systemctl start docker
    sudo systemctl enable docker
fi

# Check and install Docker Compose if not installed
echo "Installing Docker Compose if not already installed..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Start services
echo "Starting Music Analytics Platform services..."
cd "$(dirname "$0")"
docker-compose down --remove-orphans
docker-compose up -d --build

# Show access information
echo "Services started! You can access:"
echo "- API Gateway: http://$(hostname -I | awk '{print $1}'):8080"
echo "- Eureka Server: http://$(hostname -I | awk '{print $1}'):8762"

# Optional: Show logs
echo ""
echo "To view logs, run: docker-compose logs -f"
