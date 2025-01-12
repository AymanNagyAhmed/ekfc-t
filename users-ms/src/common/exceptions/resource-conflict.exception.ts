import { HTTP_STATUS, ERROR_MESSAGES } from '@/common/constants/api.constants';
import { BaseException } from './base.exception';

/**
 * Custom exception for resource conflict errors
 * Used when an operation conflicts with existing resource state
 * Logs error details to console for debugging
 */
export class ResourceConflictException extends BaseException {
  constructor(resource: string = 'Resource', details?: any) {
    super(
      ERROR_MESSAGES.RESOURCE_CONFLICT(resource),
      HTTP_STATUS.CONFLICT,
      details
    );
  }
} 