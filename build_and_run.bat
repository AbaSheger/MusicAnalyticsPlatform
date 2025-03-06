@echo off
echo ===== Building Music Analytics Platform =====

REM Check if we should skip tests
set SKIP_TESTS=
set /p SKIP_TESTS_INPUT="Do you want to skip tests? (y/n, default: n): "
if /i "%SKIP_TESTS_INPUT%"=="y" set SKIP_TESTS=-DskipTests

REM Build Maven project
echo Building Maven project...
if defined SKIP_TESTS (
    echo Skipping tests...
    call mvn clean install %SKIP_TESTS%
) else (
    call mvn clean install
)

REM Check if Maven build was successful
if %ERRORLEVEL% neq 0 (
    echo Maven build failed. Please fix the issues and try again.
    exit /b %ERRORLEVEL%
)

REM Check if Docker is running
docker info >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Docker is not running. Please start Docker Desktop and try again.
    exit /b 1
)

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