import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';
import { ApiResponse } from '@/common/interfaces/api-response.interface';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse } from '@nestjs/swagger';

@ApiTags('1. App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @SwaggerResponse({ 
    status: 200, 
    description: 'Application is running',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Application is running' },
        path: { type: 'string', example: '/' },
        timestamp: { type: 'string', example: '2024-12-25T11:00:00.000Z' },
        data: { 
          type: 'object',
          properties: {
            status: { type: 'string', example: 'ok' }
          }
        }
      }
    }
  })
  getHello(): Promise<ApiResponse<string>> {
    return this.appService.getHello();
  }
}
