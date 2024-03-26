# Use the official OpenJDK 17 Alpine base image
FROM openjdk:17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot JAR file into the container
COPY target/demoJwt-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8081

# Run the Spring Boot application
CMD ["java", "-jar", "app.jar"]
