import * as Joi from 'joi';

export const validationSchema = Joi.object({

  // Application
  PORT: Joi.number().default(4002),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  // CORS

  CORS_ORIGINS: Joi.string().required(),
  CORS_METHODS: Joi.string().required(),
  CORS_CREDENTIALS: Joi.string().required(),

  // Database
  
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  // RabbitMQ

  RMQ_UI_PORT: Joi.number().required(),
  RMQ_HOST: Joi.string().required(),
  RMQ_PORT: Joi.number().required(),
  RMQ_USER: Joi.string().required(),
  RMQ_PASSWORD: Joi.string().required(),
  RMQ_USERS_QUEUE: Joi.string().required(),
  RMQ_EXCHANGE: Joi.string().required(),
  RMQ_ROUTING_KEY: Joi.string().required(),

  // JWT

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),


}); 