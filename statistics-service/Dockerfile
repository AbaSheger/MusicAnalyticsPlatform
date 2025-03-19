# Use an official OpenJDK image to run the application
FROM openjdk:8-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy the pre-built JAR file into the container
COPY target/statistics-service-1.0-SNAPSHOT.jar app.jar

# Expose the port that the application will run on
EXPOSE 8083

# Set the entry point to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
