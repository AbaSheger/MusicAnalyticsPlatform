@echo off
echo ===== Oracle Cloud Deployment: Music Analytics Platform =====

echo Building application with Maven...
call mvn clean package -DskipTests -Dspring.profiles.active=cloud

REM Check for image registry URL
if "%OCI_REGISTRY_URL%"=="" (
    set /p OCI_REGISTRY_URL=Enter your Oracle Cloud Registry URL: 
)

REM Check for image registry username
if "%OCI_USERNAME%"=="" (
    set /p OCI_USERNAME=Enter your Oracle Cloud Username: 
)

echo Authenticating to Oracle Cloud Registry...
docker login %OCI_REGISTRY_URL% -u %OCI_USERNAME%

REM Tag each service with the Oracle registry URL
echo Tagging Docker images for Oracle Cloud Registry...
set SERVICES=eureka-server recommendation-service statistics-service user-tracking-service api-gateway

REM First build all the local images
echo Building local Docker images...
for %%s in (%SERVICES%) do (
    echo Building local image for %%s...
    cd %%s
    docker build -t %%s:latest .
    cd ..
)

REM Now tag and push with simpler repository names (no project name folder)
echo Tagging and pushing images...
for %%s in (%SERVICES%) do (
    echo Tagging and pushing %%s...
    docker tag %%s:latest %OCI_REGISTRY_URL%/%%s:latest
    docker push %OCI_REGISTRY_URL%/%%s:latest
)

REM Create deployment directory
if not exist cloud-deploy mkdir cloud-deploy

REM Create docker-compose file for cloud deployment with simpler paths
echo Creating cloud deployment docker-compose.yml file...
(
echo services:
echo   recommendation-service:
echo     image: %OCI_REGISTRY_URL%/recommendation-service:latest
echo     ports:
echo       - "8082:8082"
echo     environment:
echo       - SPRING_PROFILES_ACTIVE=cloud
echo       - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8762/eureka/
echo     depends_on:
echo       - eureka-server
echo     volumes:
echo       - recommendation-data:/data
echo     restart: unless-stopped
echo.  
echo   statistics-service:
echo     image: %OCI_REGISTRY_URL%/statistics-service:latest
echo     ports:
echo       - "8083:8083"
echo     environment:
echo       - SPRING_PROFILES_ACTIVE=cloud
echo       - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8762/eureka/
echo     depends_on:
echo       - eureka-server
echo     volumes:
echo       - statistics-data:/data
echo     restart: unless-stopped
echo.
echo   user-tracking-service:
echo     image: %OCI_REGISTRY_URL%/user-tracking-service:latest
echo     ports:
echo       - "8084:8084"
echo     environment:
echo       - SPRING_PROFILES_ACTIVE=cloud
echo       - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8762/eureka/
echo     depends_on:
echo       - eureka-server
echo     volumes:
echo       - user-tracking-data:/data
echo     restart: unless-stopped
echo.
echo   api-gateway:
echo     image: %OCI_REGISTRY_URL%/api-gateway:latest
echo     ports:
echo       - "8080:8080"
echo     environment:
echo       - SPRING_PROFILES_ACTIVE=cloud
echo       - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8762/eureka/
echo     depends_on:
echo       - eureka-server
echo     restart: unless-stopped
echo.
echo   eureka-server:
echo     image: %OCI_REGISTRY_URL%/eureka-server:latest
echo     ports:
echo       - "8762:8762"
echo     environment:
echo       - SPRING_PROFILES_ACTIVE=cloud
echo       - SERVER_PORT=8762
echo     restart: unless-stopped
echo.
echo volumes:
echo   recommendation-data:
echo   statistics-data:
echo   user-tracking-data:
) > cloud-deploy\docker-compose.yml

echo ==================================================
echo Deployment preparation completed!
echo Your Docker images have been pushed to %OCI_REGISTRY_URL%/
echo Docker Compose file created in cloud-deploy directory
echo.
echo Next steps:
echo 1. Copy the docker-compose.yml file from cloud-deploy to your VM
echo 2. Run 'docker-compose up -d' on your VM
echo ==================================================