# Build stage
FROM maven:3.8.5-openjdk-8-slim AS build
WORKDIR /app
COPY eureka-server.jar app.jar

# Runtime stage
FROM openjdk:8-jre-slim
WORKDIR /app

# Install wget and curl for health check
RUN apt-get update && apt-get install -y wget curl && rm -rf /var/lib/apt/lists/*

# Copy JAR from build stage
COPY --from=build /app/app.jar /app.jar

# Create non-root user
RUN groupadd -r spring && useradd -r -g spring spring
RUN chown spring:spring /app.jar

# Set proper permissions
USER spring:spring

# Expose port
EXPOSE 8761

# Configure health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=5 \
    CMD wget -q --spider http://127.0.0.1:8761/actuator/health || exit 1

# Use more memory and enable debug options
ENTRYPOINT ["java", "-Xms256m", "-Xmx512m", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-Dspring.profiles.active=docker", "-jar", "/app.jar"]
