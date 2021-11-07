FROM adoptopenjdk/openjdk11
COPY target/*.jar app.jar
ENTRYPOINT java -DDEPLOY=prod -jar app.jar