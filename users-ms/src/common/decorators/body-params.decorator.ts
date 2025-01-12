import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extracts the body from the request.
 * Use this decorator to access the request body in your route handlers.
 * 
 * @example
 * ```typescript
 * @Post('example')
 * someMethod(@BodyParams() body: any) {
 *   // body contains the request body
 * }
 * ```
 */
export const BodyParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.body;
  },
);
