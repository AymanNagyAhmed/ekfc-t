## Repositories
- [Install using docker](https://github.com/AymanNagyAhmed/ekfc-task)
-[Users Microservice](https://github.com/AymanNagyAhmed/ekfc-users-ms)


# Blogs microservice

## Prerequisites
- Node.js (v22.11.0)
- MongoDB
- RabbitMQ


## Database Configurations
- DB_HOST=127.0.0.1
- DB_TYPE=mongodb
- DB_NAME=blogs_ms_db
- DB_USER=admin
- DB_PASSWORD=admin
- DB_PORT=27017

## RabbitMQ Configurations

- RMQ_UI_PORT=15672
- RMQ_HOST=127.0.0.1

- RMQ_PORT=5672
- RMQ_USER=guest
- RMQ_PASSWORD=guest
- RMQ_EXCHANGE=blogs_exchange
- RMQ_BLOGS_QUEUE=blogs_queue
- RMQ_USERS_QUEUE=users_queue
- RMQ_ROUTING_KEY=blogs_routing_key

## JWT Configurations
- JWT_SECRET=bd45e580208b7f1a0f5117677d260b7a06de3eedee79d03bf505ccda316bdcf8
- JWT_EXPIRES_IN=1d

## Regular Installation [or Install using docker](https://github.com/AymanNagyAhmed/ekfc-task)

### Local Development Setup
1. Clone the repository
2. copy .env.dev to .env
3. yarn install
4. yarn start:dev
5. visit swagger docs "localhost:4004/api/docs"

