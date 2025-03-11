FROM amazoncorretto:17-alpine
VOLUME /tmp
COPY statistics-service.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]