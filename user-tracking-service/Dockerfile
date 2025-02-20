# Stage 1: Build the application
FROM maven:3.6.3-jdk-8 AS build
WORKDIR /app

# Copy only pom.xml and download dependencies
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copy source code and build package
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Run the application
FROM openjdk:8-jre
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/user-tracking-service-1.0-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
