@echo off
echo ===== Preparing Music Analytics Platform for VM Deployment =====

REM Create a deployment directory
echo Creating deployment package directory...
if exist vm-deploy rmdir /s /q vm-deploy
mkdir vm-deploy

REM Create directories first
mkdir vm-deploy\eureka-server
mkdir vm-deploy\api-gateway
mkdir vm-deploy\recommendation-service
mkdir vm-deploy\statistics-service
mkdir vm-deploy\user-tracking-service

REM Copy Docker-related files - note the /y flag to suppress prompts
echo Copying Docker files...
copy /y eureka-server\Dockerfile vm-deploy\eureka-server\Dockerfile
copy /y api-gateway\Dockerfile vm-deploy\api-gateway\Dockerfile
copy /y recommendation-service\Dockerfile vm-deploy\recommendation-service\Dockerfile
copy /y statistics-service\Dockerfile vm-deploy\statistics-service\Dockerfile
copy /y user-tracking-service\Dockerfile vm-deploy\user-tracking-service\Dockerfile

REM Copy JAR files (built artifacts)
echo Copying application JAR files...
copy /y eureka-server\target\eureka-server-1.0-SNAPSHOT.jar vm-deploy\eureka-server\eureka-server.jar
copy /y api-gateway\target\api-gateway-1.0-SNAPSHOT.jar vm-deploy\api-gateway\api-gateway.jar
copy /y recommendation-service\target\recommendation-service-1.0-SNAPSHOT.jar vm-deploy\recommendation-service\recommendation-service.jar
copy /y statistics-service\target\statistics-service-1.0-SNAPSHOT.jar vm-deploy\statistics-service\statistics-service.jar
copy /y user-tracking-service\target\user-tracking-service-1.0-SNAPSHOT.jar vm-deploy\user-tracking-service\user-tracking-service.jar

REM Copy the direct docker-compose file
echo Copying docker-compose file...
copy /y cloud-deploy\docker-compose.direct.yml vm-deploy\docker-compose.yml

REM Create a script for deployment on the VM
echo Creating VM deployment script...
(
echo #!/bin/bash
echo echo "===== Music Analytics Platform Deployment ====="
echo.
echo echo "Installing Docker if not already installed..."
echo if ! command -v docker ^&^> /dev/null; then
echo     sudo yum install -y docker-engine
echo     sudo systemctl enable docker
echo     sudo systemctl start docker
echo     sudo usermod -aG docker opc
echo     echo "Please log out and log back in for group changes to take effect"
echo     echo "Then run this script again"
echo     exit 1
echo fi
echo.
echo echo "Installing Docker Compose if not already installed..."
echo if ! command -v docker-compose ^&^> /dev/null; then
echo     sudo curl -L "https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-\$\(uname -s\)-\$\(uname -m\)" -o /usr/local/bin/docker-compose
echo     sudo chmod +x /usr/local/bin/docker-compose
echo fi
echo.
echo echo "Starting Music Analytics Platform services..."
echo docker-compose up -d
echo.
echo echo "Services started! You can access:"
echo echo "- API Gateway: http://localhost:8080"
echo echo "- Eureka Server: http://localhost:8762"
) > vm-deploy\deploy.sh

echo ===== Deployment package prepared! =====
echo.
echo Next steps:
echo 1. Transfer the deployment package to your VM:
echo    scp -i C:\Users\abbas\Downloads\oracle\ssh-key-2025-03-10.key -r vm-deploy opc@79.76.48.165:~/music-analytics
echo.
echo 2. SSH into your VM and deploy:
echo    ssh -i C:\Users\abbas\Downloads\oracle\ssh-key-2025-03-10.key opc@79.76.48.165
echo    cd ~/music-analytics
echo    chmod +x deploy.sh
echo    ./deploy.sh