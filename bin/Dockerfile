# Multi-stage Dockerfile (build + run)
FROM maven:3.8.6-openjdk-8 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests package

FROM openjdk:8-jre-alpine
WORKDIR /app
COPY --from=build /app/target/backend-intern-assignment-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]

