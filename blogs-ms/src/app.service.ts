import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@/common/interfaces/api-response.interface';
import { ApiResponseUtil } from '@/common/utils/api-response.util';

@Injectable()
export class AppService {
  async getHello(): Promise<ApiResponse<string>> {
    const data = 'Blogs micro service is running';
    return ApiResponseUtil.success(
      data,
      'Blogs micro service is running',
      '/api'
    );
  }
}