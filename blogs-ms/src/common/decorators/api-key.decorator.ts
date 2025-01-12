import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extracts the API key from the request headers.
 * Use this decorator to access the 'x-api-key' header value in your route handlers.
 * 
 * @example
 * ```typescript
 * @Get('protected-route')
 * someMethod(@ApiKey() apiKey: string) {
 *   // apiKey contains the value from x-api-key header
 * }
 * ```
 * 
 * @param data Not used in this decorator
 * @param ctx Current execution context
 * @returns The value of the x-api-key header or undefined if not present
 */
export const ApiKey = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-api-key'];
  },
);
