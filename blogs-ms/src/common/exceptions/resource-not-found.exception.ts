import { NotFoundException } from '@nestjs/common';

/**
 * Custom exception for resource not found errors
 * Used when a requested resource cannot be found in the system
 * Logs error details to console for debugging purposes
 */
export class ResourceNotFoundException extends NotFoundException {
  constructor(resource: string = 'Resource') {
    const message = `${resource} not found.`;
    console.error(`ResourceNotFoundException: ${message}`);
    super(message);
  }
} 