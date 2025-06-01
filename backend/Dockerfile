FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

FROM openjdk:17-oracle
WORKDIR /app
COPY --from=builder /app/main/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]