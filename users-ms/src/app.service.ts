import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@/common/interfaces/api-response.interface';
import { ApiResponseUtil } from '@/common/utils/api-response.util';

@Injectable()
export class AppService {
  async getHello(): Promise<ApiResponse<string>> {
    const data = 'Hello World!';
    return ApiResponseUtil.success(
      data,
      'Welcome message retrieved successfully',
      '/api'
    );
  }
}