import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';
import { ApiResponse } from '@/common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<ApiResponse<string>> {
    return this.appService.getHello();
  }
}
