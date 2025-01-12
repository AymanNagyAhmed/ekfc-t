import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseUtil } from '@/common/utils/api-response.util';
import { Request } from 'express';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    
    return next.handle().pipe(
      map(data => {
        // If the response is already in our API response format, return it as is
        if (data?.success !== undefined) {
          return data;
        }

        // Transform the response to our standard format
        return ApiResponseUtil.success(
          data,
          'Operation successful',
          request.url
        );
      }),
    );
  }
} 