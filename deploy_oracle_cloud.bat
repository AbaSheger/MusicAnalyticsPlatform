@echo off
echo ===== Oracle Cloud Deployment: Music Analytics Platform =====

REM Check for Oracle Cloud CLI installation
where oci >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Oracle Cloud CLI not found. Please install it first: https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm
    exit /b 1
)

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
set PROJECT_NAME=music-analytics

for %%s in (%SERVICES%) do (
    echo Building and tagging %%s...
    cd %%s
    docker build -t %OCI_REGISTRY_URL%/%PROJECT_NAME%/%%s:latest .
    cd ..
)

REM Push images to Oracle registry
echo Pushing images to Oracle Cloud Registry...
for %%s in (%SERVICES%) do (
    echo Pushing %OCI_REGISTRY_URL%/%PROJECT_NAME%/%%s:latest...
    docker push %OCI_REGISTRY_URL%/%PROJECT_NAME%/%%s:latest
)

REM Create deployment directory
if not exist cloud-deploy mkdir cloud-deploy

echo ==================================================
echo Deployment preparation completed!
echo Your Docker images have been pushed to %OCI_REGISTRY_URL%/%PROJECT_NAME%/
echo ==================================================