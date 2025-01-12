import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extracts a specific header from the request.
 * Use this decorator to access a specific header in your route handlers.
 * 
 * @example
 * ```typescript
 * @Get('example')
 * someMethod(@Headers('x-api-key') apiKey: string) {
 *   // apiKey contains the value of the x-api-key header
 * }
 * ```
 */
export const Headers = (headerName: string) =>
  createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers[headerName];
  })();
