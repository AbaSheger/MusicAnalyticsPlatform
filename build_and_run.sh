@echo off

REM Build Maven project
mvn clean install

REM Build Docker images
set services=eureka-server recommendation-service statistics-service api-gateway user-tracking-service
for %%s in (%services%) do (
    echo Building Docker image for %%s...
    cd %%s
    docker build -t %%s .
    cd ..
)

REM Run Docker Compose
docker-compose up
