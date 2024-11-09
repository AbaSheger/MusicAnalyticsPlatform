# Music Analytics Platform

A music analytics platform using a microservice architecture to track user activity, provide personalized recommendations, and aggregate music playback statistics.

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
    - [Requirements](#requirements)
    - [Build and Run](#build-and-run)
- [Microservices Overview](#microservices-overview)
    - [UserTrackingService](#usertrackingservice)
    - [RecommendationService](#recommendationservice)
    - [StatisticsService](#statisticsservice)
- [Multi-Module Project Setup](#multi-module-project-setup)
    - [Parent Project Configuration](#parent-project-configuration)
    - [Modules](#modules)
    - [Dependencies](#dependencies)
- [API Gateway and Service Discovery](#api-gateway-and-service-discovery)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
This project is a music analytics platform designed to track user activity, provide personalized music recommendations, and aggregate playback statistics using a microservice architecture.

## Architecture
The platform is composed of three core microservices:

- **UserTrackingService**: Logs user activities such as playbacks and searches.
- **RecommendationService**: Generates personalized music recommendations based on user activity.
- **StatisticsService**: Aggregates playback data to provide insights, such as the top 10 most-played tracks.

Each microservice communicates through REST APIs, and a high-level diagram is recommended to illustrate the architecture.

## Tech Stack
- **Java**
- **Spring Boot**
- **Docker**
- **Kubernetes**
- **MySQL**
- **Spring Cloud Gateway**
- **Eureka Server**

## Features
- Track user playback and search activities.
- Generate personalized recommendations based on user behavior.
- Aggregate playback data for analytics.
- Scalable microservice architecture.
- Centralized API gateway and service discovery.

## Setup Instructions

### Requirements
- **Java 11+**
- **Maven**
- **Docker**
- **Kubernetes** (Minikube or other local setup)
- **MySQL**

### Build and Run

1. **Navigate to the project directory and build the modules using Maven**:
   ```bash
   mvn clean install

2. ** Use Docker to build and run each microservice:**
   ```bash
   docker-compose up
   
3. ** Optionally, use Kubernetes (Minikube or similar) to manage the deployment if desired.**

## Microservices Overview

### UserTrackingService
Logs user actions like playbacks and searches.

Endpoints:
- POST /logPlayback
- POST /logSearch

### RecommendationService
Provides personalized music recommendations based on user activity.

Endpoints:
- GET /getRecommendations/{userId}

### StatisticsService
Aggregates data like the top 10 most-played tracks.

Endpoints:
- GET /topTracks

## Multi-Module Project Setup

### Parent Project Configuration
Create a parent Maven project with a `pom.xml` that contains shared dependencies and plugin configurations.

### Modules
- UserTrackingService
- RecommendationService
- StatisticsService
- Optionally, create a common module for shared utilities and domain models.

### Dependencies
Add the following dependencies to each microservice module:
- Spring Boot Starter (`spring-boot-starter-web`): For creating REST APIs.
- Spring Boot Data JPA (`spring-boot-starter-data-jpa`): For database integration.
- MySQL Connector (`mysql-connector-java`): To connect to the MySQL database.
- Spring Boot Actuator (`spring-boot-starter-actuator`): For monitoring and observability.
- Swagger (`springdoc-openapi-ui`): For API documentation.
- JUnit and Mockito (`spring-boot-starter-test`, `mockito-core`): For unit and integration testing.
- Docker Plugin (`spotify/dockerfile-maven-plugin`): To build Docker images.

## API Gateway and Service Discovery
- Spring Cloud Gateway is used as the API gateway for routing requests to appropriate microservices.
- Eureka Server is used for service discovery to register each microservice and enable communication between them.

## Usage
Use Postman or any API client to interact with the microservices.

Example requests:
- Log a playback activity: `POST /logPlayback`
- Get personalized recommendations: `GET /getRecommendations/{userId}`
- Retrieve top tracks: `GET /topTracks`

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE.txt) file for details.

