import { UnauthorizedException } from '@nestjs/common';

export class UserNotAuthenticatedException extends UnauthorizedException {
  constructor(message: string = 'User authentication is required.') {
    super(message);
    // Log the error with stack trace for debugging
    console.error('Authentication Error:', {
      message,
      timestamp: new Date().toISOString(),
      stack: this.stack
    });
  }
}
