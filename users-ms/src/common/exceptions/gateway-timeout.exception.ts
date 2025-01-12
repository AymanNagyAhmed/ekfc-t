import { GatewayTimeoutException as NestGatewayTimeoutException } from '@nestjs/common';

/**
 * Custom exception for gateway timeout errors
 * Used when an upstream service or external API request times out
 * Logs timeout details for monitoring and debugging
 */
export class GatewayTimeoutException extends NestGatewayTimeoutException {
  constructor(message: string = 'The request timed out while waiting for an upstream service.') {
    super(message);
    console.error(`[GatewayTimeout] ${new Date().toISOString()}: ${message}`);
  }
} 