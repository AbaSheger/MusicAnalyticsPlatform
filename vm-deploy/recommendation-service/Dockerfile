FROM amazoncorretto:17-alpine
VOLUME /tmp
COPY recommendation-service.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","/app.jar"]
