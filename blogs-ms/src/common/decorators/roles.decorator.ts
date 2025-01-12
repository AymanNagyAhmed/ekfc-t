import { SetMetadata } from '@nestjs/common';

/**
 * Role types supported by the application
 */
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MANAGER = 'manager',
  SUPER_ADMIN = 'super_admin',
}

/**
 * Key used to store roles metadata
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator that assigns roles to a route or controller
 * @param roles List of required roles for access
 * @returns Decorator function
 * @example
 * ```typescript
 * @Roles(Role.ADMIN, Role.MANAGER)
 * @Get('users')
 * findAll() {
 *   return this.usersService.findAll();
 * }
 * ```
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
