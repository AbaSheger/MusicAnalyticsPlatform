FROM amazoncorretto:17-alpine
VOLUME /tmp
COPY user-tracking-service.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]