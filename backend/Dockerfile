# Etapa 1 - Build da aplicação
FROM openjdk:17-jdk-slim AS builder

WORKDIR /app

# Copia todos os arquivos do projeto para dentro do container
COPY . .

# Dá permissão de execução ao mvnw
RUN chmod +x mvnw

# Compila o projeto sem rodar os testes
RUN ./mvnw clean package -DskipTests

# Etapa 2 - Imagem final que será executada
FROM openjdk:17-jdk-slim

WORKDIR /app

# Expõe a porta
EXPOSE 8080

# Copia o jar gerado da imagem builder
COPY --from=builder /app/target/lista-0.0.1-SNAPSHOT.jar app.jar

# Comando para iniciar o app
ENTRYPOINT ["java", "-jar", "app.jar"]
