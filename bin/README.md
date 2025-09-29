# Backend Intern Assignment (Spring Boot + MySQL + JWT)

This project is a minimal, functional backend implementing:
- User registration & login with BCrypt password hashing and JWT authentication
- Role-based access (USER vs ADMIN)
- CRUD APIs for a Task entity (each task belongs to a user)
- API versioning (`/api/v1/...`), validation, error handling
- OpenAPI/Swagger documentation via springdoc-openapi
- Simple vanilla-JS frontend to demonstrate the APIs

## Quick start (local)

1. Create a MySQL database:
   ```sql
   CREATE DATABASE intern_db;
   ```
2. Update `src/main/resources/application.properties` if your MySQL username/password or DB name differs.
3. Build the project:
   ```bash
   mvn clean package
   ```
4. Run:
   ```bash
   mvn spring-boot:run
   ```
   or run the generated jar:
   ```bash
   java -jar target/backend-intern-assignment-0.0.1-SNAPSHOT.jar
   ```
5. Open the frontend in a browser: `frontend/index.html` (open file or serve via a static server).
6. Swagger UI: http://localhost:8080/swagger-ui.html or http://localhost:8080/swagger-ui/index.html

## Notes for evaluation / submission
- README contains setup instructions. Add your resume and logs as required by the assignment email.
- If you want Docker, instructions are included in this repo (docker-compose.yml + Dockerfile).

