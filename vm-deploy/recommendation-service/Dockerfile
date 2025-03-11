FROM amazoncorretto:17-alpine
VOLUME /tmp
COPY recommendation-service.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]