@echo off
setlocal enabledelayedexpansion

echo ===== Music Analytics Platform - Run Options =====
echo.
echo 1) Run with Docker (requires Docker Desktop running)
echo 2) Run services directly (without Docker)
echo 3) Exit
echo.

set /p choice="Choose option (1-3): "

if "%choice%"=="1" goto RunDocker
if "%choice%"=="2" goto RunDirect
if "%choice%"=="3" exit /b 0
echo Invalid option. Please try again.
exit /b 1

:docker_not_running
echo Please install Docker Desktop from https://www.docker.com/products/docker-desktop/
echo After installing, restart your terminal and try again.
exit /b 1

:RunDocker
echo ===== Building and Running with Docker =====

REM Check if Docker is running
docker ps >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Docker is not running. Please start Docker Desktop and try again.
    goto docker_not_running
) else (
    echo Docker is running...
)

REM Build Maven project
echo Building Maven project...
call mvn clean install -DskipTests

REM Build Docker images
echo Building Docker images...
set services=eureka-server recommendation-service statistics-service api-gateway user-tracking-service
for %%s in (%services%) do (
    echo Building Docker image for %%s...
    cd %%s
    docker build -t %%s:latest .
    cd ..
)

REM Run Docker Compose
echo Starting services with Docker Compose...
docker-compose up
exit /b 0

:RunDirect
echo ===== Running Services Directly =====
echo This will start all services in separate windows.
echo Please make sure you have Java and Maven installed.
echo.

REM Build Maven project
echo Building Maven project...
call mvn clean install -DskipTests

REM Start Eureka Server
echo Starting Eureka Server...
start "Eureka Server" cmd /c "cd eureka-server && mvn spring-boot:run"
timeout /t 10

REM Start other services
echo Starting API Gateway...
start "API Gateway" cmd /c "cd api-gateway && mvn spring-boot:run"

echo Starting Recommendation Service...
start "Recommendation Service" cmd /c "cd recommendation-service && mvn spring-boot:run"

echo Starting Statistics Service...
start "Statistics Service" cmd /c "cd statistics-service && mvn spring-boot:run"

echo Starting User Tracking Service...
start "User Tracking Service" cmd /c "cd user-tracking-service && mvn spring-boot:run"

echo.
echo All services are starting. You can access:
echo - Eureka Server: http://localhost:8761
echo - API Gateway: http://localhost:8080
echo - Recommendation Service: http://localhost:8082
echo - Statistics Service: http://localhost:8083
echo - User Tracking Service: http://localhost:8084

echo.
echo Do you want to start the frontend too? (y/n)
set /p start_frontend="Choice: "

if /i "%start_frontend%"=="y" (
    echo Starting Frontend...
    start "Frontend" cmd /c "cd frontend && npm install && npm start"
    echo Frontend will be available at http://localhost:3000
)

exit /b 0