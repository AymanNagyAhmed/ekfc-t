import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export const createCorsConfig = (configService: ConfigService): CorsOptions => {
  const isDevEnvironment = configService.get<string>('NODE_ENV') === 'development';
  let corsOrigin: CorsOptions['origin'];

  if (isDevEnvironment) {
    corsOrigin = '*';
  } else {
    corsOrigin = (origin, callback) => {
      const allowedOrigins = configService
        .get<string>('CORS_ORIGINS', 'http://localhost:3000,http://localhost:3001')
        .split(',');
        
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    };
  }

  return {
    origin: corsOrigin,
    methods: configService
      .get<string>('CORS_METHODS', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS')
      .split(','),
    credentials: configService.get<boolean>('CORS_CREDENTIALS', true),
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: [
      'Accept',
      'Authorization', 
      'Content-Type',
      'X-Requested-With',
      'Range',
      'Origin',
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 3600,
  };
}; 