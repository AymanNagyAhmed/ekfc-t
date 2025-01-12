import { HttpException } from '@nestjs/common';
import { Logger } from '@nestjs/common';

export class BaseException extends HttpException {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    message: string,
    status: number,
    details?: any
  ) {
    super(message, status);
    this.logError(message, details);
  }

  private logError(message: string, details?: any): void {
    const errorContext = {
      message,
      timestamp: new Date().toISOString(),
      stack: this.stack,
      ...(details && { details }),
    };

    this.logger.error(message, errorContext);
  }
} 