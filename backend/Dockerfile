# Etapa de build
FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /app

# Copia todo o conteúdo do backend (onde está o Dockerfile, mvnw, etc)
COPY . .

# Dá permissão de execução ao mvnw
RUN chmod +x mvnw

# Executa o build do projeto sem testes
RUN ./mvnw clean package -DskipTests

# Etapa final: runtime com a JDK apenas
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copia o JAR gerado na etapa anterior
COPY --from=builder /app/target/*.jar app.jar

# Expõe a porta 8080
EXPOSE 8080

# Comando de entrada
ENTRYPOINT ["java", "-jar", "app.jar"]

