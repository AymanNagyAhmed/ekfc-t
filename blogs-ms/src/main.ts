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

async function bootstrap() {
  // Create a hybrid application that can handle both HTTP and microservice requests
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix(API.PREFIX);

  // Global pipes, filters, and interceptors
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalGuards(new AuthGuard(app.get(Reflector)));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Post managementmanagement API')
    .setDescription('API documentation for post management management system')
    .setVersion('1.0')
    .addTag('posts')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);

  // Connect to RabbitMQ
  app.connectMicroservice(rmqService.getOptions('BLOGS'));
  
  // Start all microservices and then listen for HTTP requests
  await app.startAllMicroservices();
  
  const port = configService.get<number>('PORT', 4004);
  await app.listen(port);
  
  console.log(`🚀 HTTP server running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
  console.log(`🐰 RabbitMQ microservice is running`);
}
bootstrap();
