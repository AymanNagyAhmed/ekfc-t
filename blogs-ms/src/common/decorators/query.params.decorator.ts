import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extracts the query parameters from the request.
 * Use this decorator to access the query parameters in your route handlers.
 * 
 * @example
 * ```typescript
 * @Get('example')
 * someMethod(@QueryParams() query: any) {
 *   // query contains the query parameters
 * }
 * ```
 */
export const QueryParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.query;
  },
);
