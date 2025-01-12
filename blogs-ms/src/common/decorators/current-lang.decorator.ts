import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extracts the current language from the request headers.
 * Use this decorator to access the current language in your route handlers.
 * 
 * @example
 * ```typescript
 * @Get('example')
 * someMethod(@CurrentLang() lang: string) {
 *   // lang contains the current language
 * }
 * ```
 */
export const CurrentLang = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['accept-language'];
  },
);
