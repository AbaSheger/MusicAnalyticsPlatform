FROM openjdk:8-jre-slim
WORKDIR /app
COPY eureka-server.jar app.jar
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "app.jar"]
