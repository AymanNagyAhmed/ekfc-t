import { ForbiddenException } from '@nestjs/common';

/**
 * Custom exception for forbidden access attempts
 * Used when a user is authenticated but lacks required permissions
 * Logs access denial details for monitoring and debugging
 */
export class AccessDeniedException extends ForbiddenException {
  constructor(message: string = 'You do not have permission to access this resource.') {
    super(message);
    console.error(`[AccessDenied] ${new Date().toISOString()}: ${message}`);
  }
} 