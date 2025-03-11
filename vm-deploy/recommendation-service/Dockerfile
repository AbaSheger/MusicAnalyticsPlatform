# Build stage
FROM amazoncorretto:17-alpine as builder
WORKDIR /app
COPY recommendation-service.jar app.jar
RUN jlink \
    --add-modules java.base,java.logging,java.xml,java.sql,java.naming,java.desktop,java.security.jgss,java.instrument,jdk.unsupported \
    --strip-debug \
    --no-man-pages \
    --no-header-files \
    --compress=2 \
    --output /javaruntime

# Runtime stage
FROM alpine:3.18
ENV JAVA_HOME=/javaruntime
ENV PATH="${JAVA_HOME}/bin:${PATH}"
COPY --from=builder /javaruntime $JAVA_HOME
COPY --from=builder /app/app.jar /app.jar

# Create non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Configure health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
    CMD wget -q --spider http://localhost:8082/actuator/health || exit 1

VOLUME /tmp
EXPOSE 8082
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "/app.jar"]
