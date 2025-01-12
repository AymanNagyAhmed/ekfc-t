# EKFC-TASK
## Prerequisites
- Docker
- Docker compose

## Installation
1. clone the repo```git clone https://github.com/AymanNagyAhmed/ekfc-task.git```
2. Geve the correct permision for install.sh ``` chmod +x ./install.sh ```
3. Install the project ```./install.sh```
4. Swagger docs: http://localhost:4003/api/docs
5. RabbitMQ GUI: http://localhost:15673/
6. Databasemanager GUI: http://localhost:8082/



# Microservices Architecture

This project implements a microservices architecture using users-microservice as gateway and auth-service and using message queuing with RabbitMQ.

## System Architecture

## Flow Explanation

1. **Client Request**
   - Client sends HTTP request to the users microservice
   - Client register 
   - Client login
   - Logein client hows can retrive, create, update and delete posts
   - Requests can be GET, POST, PUT, DELETE operations for posts

2. **API Gateway Processing**
   - Users microservice validates the incoming request
   - Transforms the request into a message format
   - Publishes the message to RabbitMQ queue

3. **Message Queuing**
   - RabbitMQ receives the message from users microservice
   - Routes the message to appropriate microservice queue
   - Ensures message delivery and persistence

4. **Blogs Microservice**
   - Consumes messages from its dedicated queue
   - Processes the business logic
   - Performs database operations
   - Sends response back through RabbitMQ

5. **Response Flow**
   - Response travels back through RabbitMQ
   - Users microservice receives and transforms the response
   - Client receives the final HTTP response

## Benefits

- **Decoupling**: Services are loosely coupled through message queuing
- **Scalability**: Each component can scale independently
- **Reliability**: Message persistence ensures no data loss
- **Flexibility**: Easy to add new microservices or modify existing ones

## Technologies Used

- NestJS for microservices
- RabbitMQ for message queuing
- TypeScript for type safety
- Docker for containerization
