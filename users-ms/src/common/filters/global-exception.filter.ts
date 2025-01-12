import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponseUtil } from '@/common/utils/api-response.util';
import { ERROR_MESSAGES, HTTP_STATUS } from '@/common/constants/api.constants';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status: typeof HTTP_STATUS[keyof typeof HTTP_STATUS] = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        let message = ERROR_MESSAGES.UNEXPECTED_ERROR;
        let errors: Record<string, any> | undefined;

        if (exception instanceof HttpException) {
            const httpStatus = exception.getStatus();
            // Map NestJS HttpStatus to our HTTP_STATUS
            status = this.mapHttpStatus(httpStatus);
            const exceptionResponse = exception.getResponse() as any;
            message = exceptionResponse.message || message;
            errors = exceptionResponse.errors;
        }

        this.logger.error(
            `${request.method} ${request.url} ${status} - ${message}`,
            exception instanceof Error ? exception.stack : undefined,
        );

        const errorResponse = ApiResponseUtil.error(
            message,
            request.url,
            status,
            errors,
        );

        response.status(status).json(errorResponse);
    }

    private mapHttpStatus(status: number): typeof HTTP_STATUS[keyof typeof HTTP_STATUS] {
        const statusMap: Record<number, typeof HTTP_STATUS[keyof typeof HTTP_STATUS]> = {
            [HttpStatus.OK]: HTTP_STATUS.OK,
            [HttpStatus.CREATED]: HTTP_STATUS.CREATED,
            [HttpStatus.BAD_REQUEST]: HTTP_STATUS.BAD_REQUEST,
            [HttpStatus.UNAUTHORIZED]: HTTP_STATUS.UNAUTHORIZED,
            [HttpStatus.FORBIDDEN]: HTTP_STATUS.FORBIDDEN,
            [HttpStatus.NOT_FOUND]: HTTP_STATUS.NOT_FOUND,
            [HttpStatus.CONFLICT]: HTTP_STATUS.CONFLICT,
            [HttpStatus.INTERNAL_SERVER_ERROR]: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            [HttpStatus.SERVICE_UNAVAILABLE]: HTTP_STATUS.SERVICE_UNAVAILABLE,
            [HttpStatus.GATEWAY_TIMEOUT]: HTTP_STATUS.GATEWAY_TIMEOUT,
        };

        return statusMap[status] || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    }
} 