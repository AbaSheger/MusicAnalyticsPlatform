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
- AI-based recommendation algorithm for personalized music recommendations.

## Setup Instructions

### Requirements
- **Java 21**
- **Maven**
- **Docker**
- **Kubernetes** (Minikube or other local setup)
- **MySQL**

### Build and Run

1. **Navigate to the project directory and build the modules using Maven**:
   ```bash
   mvn clean install
   ```

2. ** Use Docker to build and run each microservice:**
   ```bash
   docker-compose up
   ```

3. ** Optionally, use Kubernetes (Minikube or similar) to manage the deployment if desired.**

4. **Navigate to the `frontend` directory**:
   ```bash
   cd frontend
   ```

5. **Install the dependencies**:
   ```bash
   npm install
   ```

6. **Build the frontend application**:
   ```bash
   npm run build
   ```

7. **Start the frontend application**:
   ```bash
   npm start
   ```

8. **Open your browser and navigate to**:
   ```
   http://localhost:3000
   ```

### GitHub Actions Workflow

In the GitHub Actions workflow configuration file `.github/workflows/ci.yml`, ensure that the `distribution` parameter is specified under the `setup-java` step with the value `temurin`. This is required for the `actions/setup-java` step to function correctly.

Example configuration:
```yaml
- name: Set up JDK 21
  uses: actions/setup-java@v2
  with:
    java-version: 21
    distribution: 'temurin'
```

### Installing Docker Compose in GitHub Actions Workflow

To ensure that Docker Compose is available in the GitHub Actions runner environment, you need to add steps to install Docker Compose before running any `docker-compose` commands.

Example configuration:
```yaml
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Docker Compose
      run: |
        sudo apt-get update
        sudo apt-get install -y docker-compose

    - name: Set up JDK 21
      uses: actions/setup-java@v2
      with:
        java-version: 21
        distribution: 'temurin'

    - name: Build with Maven
      run: mvn clean install
      working-directory: .

    - name: Build Docker images
      run: docker-compose build

    - name: Run unit tests
      run: mvn test
      working-directory: .

    - name: Run integration tests
      run: mvn verify
      working-directory: .

    - name: Install frontend dependencies
      run: npm install
      working-directory: ./frontend

    - name: Install react-scripts globally
      run: npm install -g react-scripts

    - name: Build frontend
      run: npm run build
      working-directory: ./frontend

    - name: Run frontend tests
      run: npm test
      working-directory: ./frontend

    - name: Start frontend
      run: npm start
      working-directory: ./frontend

    - name: Set up database
      run: |
        docker-compose up -d db
        sleep 10 # wait for the database to be ready

    - name: Run database migrations
      run: mvn flyway:migrate
      working-directory: .

    - name: Deploy to Kubernetes
      run: |
        kubectl apply -f k8s/user-tracking-service-deployment.yaml
        kubectl apply -f k8s/recommendation-service-deployment.yaml
        kubectl apply -f k8s/statistics-service-deployment.yaml
        kubectl apply -f k8s/api-gateway-deployment.yaml
        kubectl apply -f k8s/eureka-server-deployment.yaml
```

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
- GET /getAIRecommendations/{userId}

### StatisticsService
Aggregates data like the top 10 most-played tracks.

Endpoints:
- GET /topTracks

### EurekaServerApplication
Handles service registration and discovery.

### ApiGatewayApplication
Routes requests to the appropriate microservices.

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
- Get AI-generated recommendations: `GET /getAIRecommendations/{userId}`
- Retrieve top tracks: `GET /topTracks`

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE.txt) file for details.

## Detailed Setup Instructions

### Building and Running the Microservices

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AbaSheger/MusicAnalyticsPlatform.git
   cd MusicAnalyticsPlatform
   ```

2. **Build the project using Maven**:
   ```bash
   mvn clean install
   ```

3. **Navigate to each microservice directory and build Docker images**:
   ```bash
   cd UserTrackingService
   docker build -t user-tracking-service .
   cd ../RecommendationService
   docker build -t recommendation-service .
   cd ../StatisticsService
   docker build -t statistics-service .
   cd ../api-gateway
   docker build -t api-gateway .
   cd ../eureka-server
   docker build -t eureka-server .
   ```

4. **Run the Docker containers**:
   ```bash
   docker-compose up
   ```

### Setting Up Docker and Kubernetes

1. **Install Docker**:
   Follow the instructions on the [Docker website](https://docs.docker.com/get-docker/) to install Docker on your machine.

2. **Install Kubernetes**:
   Follow the instructions on the [Kubernetes website](https://kubernetes.io/docs/setup/) to install Kubernetes. You can use Minikube for a local setup.

3. **Deploy the microservices to Kubernetes**:
   Create Kubernetes deployment and service files for each microservice and apply them using `kubectl`:
   ```bash
   kubectl apply -f user-tracking-service-deployment.yaml
   kubectl apply -f recommendation-service-deployment.yaml
   kubectl apply -f statistics-service-deployment.yaml
   kubectl apply -f api-gateway-deployment.yaml
   kubectl apply -f eureka-server-deployment.yaml
   ```

### API Gateway and Eureka Server Configuration

1. **API Gateway Configuration**:
   The API Gateway is configured using Spring Cloud Gateway. The routes for the microservices are defined in the `application.yml` file located in the `api-gateway/src/main/resources` directory.

2. **Eureka Server Configuration**:
   The Eureka Server is configured using the `application.yml` file located in the `eureka-server/src/main/resources` directory. The Eureka Server registers each microservice and enables service discovery.

3. **Running the API Gateway and Eureka Server**:
   Start the API Gateway and Eureka Server using Docker or Kubernetes as described in the previous sections.

4. **Accessing the Microservices**:
   Use the API Gateway to access the microservices. The API Gateway routes requests to the appropriate microservice based on the configured routes.

## Verifying the Setup

1. **Run Integration Tests**:
   Ensure that all microservices communicate correctly by running integration tests. Use tools like Postman or any API client to send requests to the microservices and verify the responses.

2. **Check API Documentation**:
   Each microservice should have proper endpoints documented with Swagger. Access the Swagger UI for each microservice to view the API documentation.

3. **Monitor the Services**:
   Use Spring Boot Actuator to monitor the health and metrics of each microservice. Access the Actuator endpoints to view the status and metrics of the services.

## Conclusion

By following these detailed setup instructions, you should be able to build, run, and deploy the Music Analytics Platform microservices using Docker and Kubernetes. The API Gateway and Eureka Server configuration ensures proper routing and service discovery, enabling seamless communication between the microservices. Verify the setup by running integration tests and checking the API documentation to ensure everything is working as expected.

## Frontend Setup Instructions

### Requirements
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Build and Run

1. **Navigate to the `frontend` directory**:
   ```bash
   cd frontend
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser and navigate to**:
   ```
   http://localhost:3000
   ```

The frontend application should now be running and able to interact with the backend services.

## Detailed Examples and Use Cases

### Example 1: Logging User Playback and Search Activities

1. **Log a playback activity**:
   ```bash
   curl -X POST http://localhost:8081/user-tracking/logPlayback -H "Content-Type: application/json" -d '{"playback": "Track A"}'
   ```

2. **Log a search activity**:
   ```bash
   curl -X POST http://localhost:8081/user-tracking/logSearch -H "Content-Type: application/json" -d '{"search": "Artist X"}'
   ```

### Example 2: Getting Personalized Recommendations

1. **Get personalized recommendations for a user**:
   ```bash
   curl -X GET http://localhost:8082/recommendation/getRecommendations/1
   ```

2. **Get AI-generated recommendations for a user**:
   ```bash
   curl -X GET http://localhost:8082/recommendation/getAIRecommendations/1
   ```

### Example 3: Retrieving Top Tracks

1. **Get the top tracks**:
   ```bash
   curl -X GET http://localhost:8083/statistics/topTracks
   ```

## Microservices Interactions and Data Flow

### UserTrackingService

- **Logs user activities**: The UserTrackingService logs user activities such as playbacks and searches. These logs are stored in a database for further analysis.

### RecommendationService

- **Generates personalized recommendations**: The RecommendationService retrieves user activity data from the UserTrackingService and uses an AI-based algorithm to generate personalized music recommendations.

### StatisticsService

- **Aggregates playback data**: The StatisticsService retrieves playback data from the UserTrackingService and aggregates it to provide insights such as the top 10 most-played tracks.

### Data Flow

1. **User Activity Logging**: The UserTrackingService logs user activities such as playbacks and searches.
2. **Recommendation Generation**: The RecommendationService retrieves user activity data from the UserTrackingService and generates personalized recommendations.
3. **Data Aggregation**: The StatisticsService retrieves playback data from the UserTrackingService and aggregates it to provide insights.

## User Interface Screenshots

### Home Page

![Home Page](screenshots/home_page.png)

### Recommendations Page

![Recommendations Page](screenshots/recommendations_page.png)

### Statistics Page

![Statistics Page](screenshots/statistics_page.png)

### User Tracking Page

![User Tracking Page](screenshots/user_tracking_page.png)

## Demo Videos

### Home Page Demo

[![Home Page Demo](screenshots/home_page_demo.png)](https://www.youtube.com/watch?v=home_page_demo)

### Recommendations Page Demo

[![Recommendations Page Demo](screenshots/recommendations_page_demo.png)](https://www.youtube.com/watch?v=recommendations_page_demo)

### Statistics Page Demo

[![Statistics Page Demo](screenshots/statistics_page_demo.png)](https://www.youtube.com/watch?v=statistics_page_demo)

### User Tracking Page Demo

[![User Tracking Page Demo](screenshots/user_tracking_page_demo.png)](https://www.youtube.com/watch?v=user_tracking_page_demo)
