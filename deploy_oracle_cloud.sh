#!/bin/bash
# Oracle Cloud Free Tier Deployment Script for Music Analytics Platform

echo "===== Oracle Cloud Free Tier Deployment: Music Analytics Platform ====="

# Check for Oracle Cloud CLI installation
if ! command -v oci &> /dev/null; then
    echo "Oracle Cloud CLI not found. Please install it first: https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm"
    exit 1
fi

echo "Building application with Maven..."
mvn clean package -DskipTests -Dspring.profiles.active=cloud

# Check for image registry URL
if [ -z "$OCI_REGISTRY_URL" ]; then
    read -p "Enter your Oracle Cloud Registry URL: " OCI_REGISTRY_URL
fi

# Check for image registry username
if [ -z "$OCI_USERNAME" ]; then
    read -p "Enter your Oracle Cloud Username: " OCI_USERNAME
fi

# Check if already authenticated to registry
echo "Authenticating to Oracle Cloud Registry..."
docker login $OCI_REGISTRY_URL -u $OCI_USERNAME

# Tag each service with the Oracle registry URL
echo "Tagging Docker images for Oracle Cloud Registry..."
SERVICES="eureka-server recommendation-service statistics-service user-tracking-service api-gateway"
PROJECT_NAME="music-analytics"

for SERVICE in $SERVICES; do
    echo "Building and tagging $SERVICE..."
    cd $SERVICE
    docker build -t $OCI_REGISTRY_URL/$PROJECT_NAME/$SERVICE:latest .
    cd ..
done

# Push images to Oracle registry
echo "Pushing images to Oracle Cloud Registry..."
for SERVICE in $SERVICES; do
    echo "Pushing $OCI_REGISTRY_URL/$PROJECT_NAME/$SERVICE:latest..."
    docker push $OCI_REGISTRY_URL/$PROJECT_NAME/$SERVICE:latest
done

# Generate cloud deployment config
echo "Generating Cloud deployment files..."

mkdir -p cloud-deploy

echo "===================================================="
echo "Deployment preparation completed!"
echo "Your Docker images have been pushed to $OCI_REGISTRY_URL/$PROJECT_NAME/"
echo "===================================================="