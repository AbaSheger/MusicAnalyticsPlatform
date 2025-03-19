# First stage: Build the application
FROM maven:3.8.5-openjdk-8-slim AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests
# Set up Java runtime (if needed)
RUN mkdir -p /javaruntime && \
    cp -R $JAVA_HOME/* /javaruntime/

# Second stage: Create the runtime image
FROM alpine:3.18
RUN apk add --no-cache openjdk8-jre-base
WORKDIR /app
ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk
ENV PATH="${JAVA_HOME}/bin:${PATH}"
COPY --from=builder /app/target/eureka-server-*.jar /app/app.jar
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
