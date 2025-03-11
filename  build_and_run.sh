#!/bin/bash

# Build Maven project
mvn clean install

# Build Docker images
services=("eureka-server" "recommendation-service" "statistics-service" "api-gateway" "user-tracking-service")
for service in "${services[@]}"; do
  echo "Building Docker image for $service..."
  cd $service
  docker build -t $service .
  cd ..
done

# Run Docker Compose
docker-compose up