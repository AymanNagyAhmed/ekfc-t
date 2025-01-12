import { ServiceUnavailableException as NestServiceUnavailableException } from '@nestjs/common';

/**
 * Custom exception for service unavailability errors
 * Used when a required service or dependency is not available
 */
export class ServiceUnavailableException extends NestServiceUnavailableException {
  constructor(
    service: string = 'Service',
    error?: Error
  ) {
    const message = `${service} is currently unavailable. Please try again later.`;
    super(message);

    // Log the error details
    if (error) {
      console.error(`ServiceUnavailableException: ${service}`);
      console.error('Error details:', error);
      console.error('Stack trace:', error.stack);
    } else {
      console.error(`ServiceUnavailableException: ${message}`);
    }
  }
} 