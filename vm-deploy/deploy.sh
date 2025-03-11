#!/bin/bash
echo "===== Music Analytics Platform Deployment ====="

echo "Installing Docker if not already installed..."
if ! command -v docker &> /dev/null; then
    sudo yum install -y docker-engine
    sudo systemctl enable docker
    sudo systemctl start docker
    sudo usermod -aG docker opc
    echo "Please log out and log back in for group changes to take effect"
    echo "Then run this script again"
    exit 1
fi

echo "Installing Docker Compose if not already installed..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-\$\(uname -s\)-\$\(uname -m\)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

echo "Starting Music Analytics Platform services..."
docker-compose up -d

echo "Services started! You can access:"
echo "- API Gateway: http://localhost:8080"
echo "- Eureka Server: http://localhost:8762"
