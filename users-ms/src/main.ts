import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './common/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';
import { TransformResponseInterceptor } from '@/common/interceptors/transform-response.interceptor';
import { API } from '@/common/constants/api.constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RmqService } from '@/config/rmq/rmq.service';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { SocketIoAdapter } from '@/common/adapters/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API.PREFIX);

  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Global response transformer
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('User managementmanagement API')
    .setDescription('API documentation for user management management system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const configService = app.get(ConfigService);
  app.useGlobalGuards(new AuthGuard(app.get(Reflector)));
  
  const port = configService.get<number>('PORT', 4003);
  
  // Connect to RabbitMQ
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('users', true));
  await app.startAllMicroservices();

  // Add cookie parser middleware
  app.use(cookieParser());

  app.useGlobalFilters(new HttpExceptionFilter());

  // Configure WebSocket adapter
  app.useWebSocketAdapter(new SocketIoAdapter(app, configService));

  await app.listen(port);
  console.log(`🚀 HTTP server running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
  console.log(`🐰 RabbitMQ microservice is running`);
  console.log(`🔌 WebSocket server is running on port ${configService.get<number>('WS_PORT')}`);
}
bootstrap();
