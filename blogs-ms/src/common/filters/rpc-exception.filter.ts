import { Catch, RpcExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { InvalidInputException } from '@/common/exceptions/invalid-input.exception';
import { ResourceNotFoundException } from '@/common/exceptions/resource-not-found.exception';
import { UnauthorizedException } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<any> {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost): Observable<any> {
    this.logger.error('Exception caught in RPC filter:', exception);

    let status = 500;
    let message = 'Internal server error';
    let error = exception.name || 'InternalServerError';

    // Handle specific exception types
    if (exception instanceof InvalidInputException) {
      status = 400;
      message = exception.message;
      error = 'InvalidInput';
    } else if (exception instanceof ResourceNotFoundException) {
      status = 404;
      message = exception.message;
      error = 'NotFound';
    } else if (exception instanceof UnauthorizedException) {
      status = 401;
      message = exception.message;
      error = 'Unauthorized';
    }

    return throwError(() => ({
      message,
      status,
      error
    }));
  }
} 