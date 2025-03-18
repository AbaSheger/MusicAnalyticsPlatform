# Build stage
FROM amazoncorretto:17-alpine as builder
WORKDIR /app
COPY eureka-server.jar app.jar
RUN apk add --no-cache binutils \
    && jlink \
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

# Install wget and curl for health check
RUN apk add --no-cache wget curl

# Create non-root user
RUN addgroup -S spring && adduser -S spring -G spring
RUN chown -R spring:spring /app.jar

# Set proper permissions
USER spring:spring

# Expose port
EXPOSE 8761

# Configure health check - with longer start time and using 0.0.0.0 instead of localhost
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=5 \
    CMD wget -q --spider http://127.0.0.1:8761/actuator/health || exit 1

# Use more memory and enable debug options
ENTRYPOINT ["java", "-Xms256m", "-Xmx512m", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-Dspring.profiles.active=docker", "-jar", "/app.jar"]
