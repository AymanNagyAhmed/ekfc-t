import { BadRequestException } from '@nestjs/common';

export class InvalidInputException extends BadRequestException {
  constructor(message: string = 'The provided input is invalid.') {
    super(message);
    // Log the error details
    console.error('[InvalidInputException]:', {
      message,
      timestamp: new Date().toISOString(),
      stack: this.stack,
    });
  }
}
