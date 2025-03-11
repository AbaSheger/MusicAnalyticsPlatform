@echo off
echo ===== Oracle Cloud Deployment: Music Analytics Platform =====

REM Check for required environment variables
if "%OCI_REGISTRY_URL%"=="" (
    echo ERROR: OCI_REGISTRY_URL environment variable is not set
    echo Please set it using: set OCI_REGISTRY_URL=your-registry-url
    exit /b 1
)

if "%OCI_USERNAME%"=="" (
    echo ERROR: OCI_USERNAME environment variable is not set
    echo Please set it using: set OCI_USERNAME=your-username
    exit /b 1
)

echo Using:
echo - Registry URL: %OCI_REGISTRY_URL%
echo - Username: %OCI_USERNAME%
echo.

echo Building Docker images and pushing to Oracle Cloud Registry...

REM Build images and push (one at a time to avoid errors)
cd api-gateway
docker build -t api-gateway:latest .
docker tag api-gateway:latest %OCI_REGISTRY_URL%/api-gateway:latest
docker push %OCI_REGISTRY_URL%/api-gateway:latest
cd ..

cd eureka-server
docker build -t eureka-server:latest .
docker tag eureka-server:latest %OCI_REGISTRY_URL%/eureka-server:latest
docker push %OCI_REGISTRY_URL%/eureka-server:latest
cd ..

cd recommendation-service
docker build -t recommendation-service:latest .
docker tag recommendation-service:latest %OCI_REGISTRY_URL%/recommendation-service:latest
docker push %OCI_REGISTRY_URL%/recommendation-service:latest
cd ..

cd statistics-service
docker build -t statistics-service:latest .
docker tag statistics-service:latest %OCI_REGISTRY_URL%/statistics-service:latest
docker push %OCI_REGISTRY_URL%/statistics-service:latest
cd ..

cd user-tracking-service
docker build -t user-tracking-service:latest .
docker tag user-tracking-service:latest %OCI_REGISTRY_URL%/user-tracking-service:latest
docker push %OCI_REGISTRY_URL%/user-tracking-service:latest
cd ..

REM Create deployment directory
if not exist cloud-deploy mkdir cloud-deploy

REM Create docker-compose file for deployment
echo Creating docker-compose.yml file...
echo services: > cloud-deploy\docker-compose.yml
echo   recommendation-service: >> cloud-deploy\docker-compose.yml
echo     image: %OCI_REGISTRY_URL%/recommendation-service:latest >> cloud-deploy\docker-compose.yml
echo     ports: >> cloud-deploy\docker-compose.yml
echo       - "8082:8082" >> cloud-deploy\docker-compose.yml
echo     environment: >> cloud-deploy\docker-compose.yml
echo       - SPRING_PROFILES_ACTIVE=cloud >> cloud-deploy\docker-compose.yml
echo       - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8762/eureka/ >> cloud-deploy\docker-compose.yml
echo     depends_on: >> cloud-deploy\docker-compose.yml
echo       - eureka-server >> cloud-deploy\docker-compose.yml
echo     volumes: >> cloud-deploy\docker-compose.yml
echo       - recommendation-data:/data >> cloud-deploy\docker-compose.yml
echo     restart: unless-stopped >> cloud-deploy\docker-compose.yml
echo. >> cloud-deploy\docker-compose.yml
echo   statistics-service: >> cloud-deploy\docker-compose.yml
echo     image: %OCI_REGISTRY_URL%/statistics-service:latest >> cloud-deploy\docker-compose.yml
echo     ports: >> cloud-deploy\docker-compose.yml
echo       - "8083:8083" >> cloud-deploy\docker-compose.yml
echo     environment: >> cloud-deploy\docker-compose.yml
echo       - SPRING_PROFILES_ACTIVE=cloud >> cloud-deploy\docker-compose.yml
echo       - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8762/eureka/ >> cloud-deploy\docker-compose.yml
echo     depends_on: >> cloud-deploy\docker-compose.yml
echo       - eureka-server >> cloud-deploy\docker-compose.yml
echo     volumes: >> cloud-deploy\docker-compose.yml
echo       - statistics-data:/data >> cloud-deploy\docker-compose.yml
echo     restart: unless-stopped >> cloud-deploy\docker-compose.yml
echo. >> cloud-deploy\docker-compose.yml
echo   user-tracking-service: >> cloud-deploy\docker-compose.yml
echo     image: %OCI_REGISTRY_URL%/user-tracking-service:latest >> cloud-deploy\docker-compose.yml
echo     ports: >> cloud-deploy\docker-compose.yml
echo       - "8084:8084" >> cloud-deploy\docker-compose.yml
echo     environment: >> cloud-deploy\docker-compose.yml
echo       - SPRING_PROFILES_ACTIVE=cloud >> cloud-deploy\docker-compose.yml
echo       - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8762/eureka/ >> cloud-deploy\docker-compose.yml
echo     depends_on: >> cloud-deploy\docker-compose.yml
echo       - eureka-server >> cloud-deploy\docker-compose.yml
echo     volumes: >> cloud-deploy\docker-compose.yml
echo       - user-tracking-data:/data >> cloud-deploy\docker-compose.yml
echo     restart: unless-stopped >> cloud-deploy\docker-compose.yml
echo. >> cloud-deploy\docker-compose.yml
echo   api-gateway: >> cloud-deploy\docker-compose.yml
echo     image: %OCI_REGISTRY_URL%/api-gateway:latest >> cloud-deploy\docker-compose.yml
echo     ports: >> cloud-deploy\docker-compose.yml
echo       - "8080:8080" >> cloud-deploy\docker-compose.yml
echo     environment: >> cloud-deploy\docker-compose.yml
echo       - SPRING_PROFILES_ACTIVE=cloud >> cloud-deploy\docker-compose.yml
echo       - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8762/eureka/ >> cloud-deploy\docker-compose.yml
echo     depends_on: >> cloud-deploy\docker-compose.yml
echo       - eureka-server >> cloud-deploy\docker-compose.yml
echo     restart: unless-stopped >> cloud-deploy\docker-compose.yml
echo. >> cloud-deploy\docker-compose.yml
echo   eureka-server: >> cloud-deploy\docker-compose.yml
echo     image: %OCI_REGISTRY_URL%/eureka-server:latest >> cloud-deploy\docker-compose.yml
echo     ports: >> cloud-deploy\docker-compose.yml
echo       - "8762:8762" >> cloud-deploy\docker-compose.yml
echo     environment: >> cloud-deploy\docker-compose.yml
echo       - SPRING_PROFILES_ACTIVE=cloud >> cloud-deploy\docker-compose.yml
echo       - SERVER_PORT=8762 >> cloud-deploy\docker-compose.yml
echo     restart: unless-stopped >> cloud-deploy\docker-compose.yml
echo. >> cloud-deploy\docker-compose.yml
echo volumes: >> cloud-deploy\docker-compose.yml
echo   recommendation-data: >> cloud-deploy\docker-compose.yml
echo   statistics-data: >> cloud-deploy\docker-compose.yml
echo   user-tracking-data: >> cloud-deploy\docker-compose.yml

echo ==================================================
echo Deployment preparation completed!
echo Docker Compose file created in cloud-deploy directory
echo.
echo Next steps:
echo 1. Copy the docker-compose.yml file to your VM:
echo    scp -i %SSH_KEY_PATH% cloud-deploy\docker-compose.yml %VM_USER%@%VM_IP%:~/
echo.
echo 2. SSH into your VM and run:
echo    ssh -i %SSH_KEY_PATH% %VM_USER%@%VM_IP%
echo    docker login %OCI_REGISTRY_URL% -u %OCI_USERNAME%
echo    docker-compose up -d
echo ==================================================