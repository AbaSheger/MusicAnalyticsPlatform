FROM amazoncorretto:17-alpine
VOLUME /tmp
COPY user-tracking-service.jar app.jar
EXPOSE 8084
ENTRYPOINT ["java","-jar","/app.jar"]