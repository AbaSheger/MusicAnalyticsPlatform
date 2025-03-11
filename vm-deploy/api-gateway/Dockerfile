FROM amazoncorretto:17-alpine
VOLUME /tmp
COPY api-gateway.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]