import { InternalServerErrorException } from '@nestjs/common';

/**
 * Custom exception for unexpected server errors
 * Used when an unexpected error occurs during request processing
 * Logs error details to console for debugging
 */
export class UnexpectedErrorException extends InternalServerErrorException {
  constructor(
    message: string = 'An unexpected error occurred while processing your request.',
    error?: Error
  ) {
    super(message);
    
    // Log error details to console
    console.error('Unexpected Error:', {
      message,
      timestamp: new Date().toISOString(),
      stack: error?.stack || this.stack,
      originalError: error
    });
  }
} 