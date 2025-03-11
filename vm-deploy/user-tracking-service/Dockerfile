FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests
# List files to debug
RUN ls -la target/

FROM openjdk:17-jdk-slim
WORKDIR /app
# Use wildcard to match any jar file
COPY --from=build /app/target/*.jar ./app.jar
CMD ["java", "-jar", "app.jar"]