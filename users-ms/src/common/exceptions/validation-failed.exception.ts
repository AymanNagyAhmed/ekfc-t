import { UnprocessableEntityException } from '@nestjs/common';

/**
 * Custom exception for validation failures
 * Used when request data fails validation rules
 * @param message Error message describing the validation failure
 * @param errors Optional validation error details
 */
export class ValidationFailedException extends UnprocessableEntityException {
  constructor(message: string = 'Validation failed', errors?: unknown) {
    super(message);
    
    // Log validation error details
    console.error('[ValidationFailedException]:', {
      message,
      timestamp: new Date().toISOString(),
      errors: errors || 'No additional error details provided'
    });
  }
} 