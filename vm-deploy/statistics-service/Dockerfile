FROM amazoncorretto:17-alpine
VOLUME /tmp
COPY statistics-service.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java","-jar","/app.jar"]
