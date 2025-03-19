# Use an official Maven image to build the application
FROM maven:3.8.5-openjdk-8-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml file and download the dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn package -DskipTests

# Use an official OpenJDK image to run the application
FROM openjdk:8-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy the built JAR file from the build stage
COPY --from=build /app/target/statistics-service-1.0-SNAPSHOT.jar app.jar

# Expose the port that the application will run on
EXPOSE 8083

# Set the entry point to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
