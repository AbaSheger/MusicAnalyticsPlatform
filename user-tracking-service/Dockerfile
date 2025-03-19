# Build stage - adjusted to use Java 8 for consistency with parent pom.xml
FROM maven:3.8.5-openjdk-8-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests
# List files to debug
RUN ls -la target/

# Runtime stage - changed from Java 17 to Java 8
FROM openjdk:8-jre-slim
WORKDIR /app
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
# Use specific JAR name instead of wildcard
COPY --from=build /app/target/user-tracking-service-1.0-SNAPSHOT.jar ./app.jar
CMD ["java", "-jar", "app.jar"]