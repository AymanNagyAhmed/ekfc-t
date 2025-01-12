import { SetMetadata } from '@nestjs/common';

/**
 * Decorator to mark a route as public.
 * Public routes are not checked for authentication.
 * 
 * @example
 * ```typescript
 * @Public()
 * @Get('public-endpoint')
 * publicEndpoint() {
 *   return 'This is a public endpoint';
 * }
 * ```
 */
export const Public = () => SetMetadata('isPublic', true);
