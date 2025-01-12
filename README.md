# EKFC-TASK
## Prerequisites
- Docker
- Docker compose

## Installation
1. clone the repo```git clone https://github.com/AymanNagyAhmed/ekfc-task.git```
2. Geve the correct permision for install.sh ``` chmod +x ./install.sh ```
3. Install the project ```./install.sh```
4. Swagger docs: http://localhost:4003/api/docs
5. WebSocket docs: http://localhost:4005/posts
6. blogs-ms helth-check: http://localhost:4004/api/
7. RabbitMQ GUI: http://localhost:15673/
8. Databasemanager GUI: http://localhost:8082/

## Testing soket io with Postman
1. **Create a New WebSocket Request**
   - In Postman create a new "WebSocket Request"
   - Enter the WebSocket URL: `ws://localhost:4005/posts`

2. **Configure Authentication**
   - In the "Headers" tab add:
   ```
      Authentication: Bearer your_jwt_token
   ```

### Test Post Updates & Delete
1. Add authentication header with your jwt token
```
Authentication: Bearer your_jwt_token
```
2. **In event field write post_{your_post_id}**

3. **Connect to WebSocket** (click connect button)
4. **Observe Post Updates**
   - When a post is updated, you'll receive messages in this format:
   ```json
   {
     "event": "POST_UPDATED",
     "postId": "post_id",
     "userId": "user_id",
     "data": {
       "title": "Updated Title",
       "content": "Updated Content"
     },
     "timestamp": "2024-03-14T12:00:00.000Z"
   }
   ```

5. **Observe Post Deletions**
   - **In event field write user_{your_user_id}**
   - When a post is deleted, you'll receive messages in this format:
   ```json
   {
     "event": "POST_DELETED",
     "postId": "post_id",
     "userId": "user_id",
     "timestamp": "2024-03-14T12:00:00.000Z"
   }
   ```

# Microservices Architecture

This project implements a microservices architecture using users-microservice as gateway, auth-service, websoket and using message queuing with RabbitMQ.

## Technologies Used

- NestJS for microservices
- MongoDB for database
- Socket.io for real-time communication
- RabbitMQ for message queuing
- TypeScript for type safety
- Docker for containerization
