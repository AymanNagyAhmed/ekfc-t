import { SetMetadata } from '@nestjs/common';
import { Permission } from '@/common/enums/permission.enum';

/**
 * Key used to store permissions metadata
 */
export const PERMISSIONS_KEY = 'permissions';

/**
 * Decorator that assigns permissions to a route or controller
 * @param permissions List of required permissions for access
 * @returns Decorator function
 * @example
 * ```typescript
 * @Permissions(Permission.CREATE_USER, Permission.UPDATE_USER)
 * @Post('users')
 * create(@Body() createUserDto: CreateUserDto) {
 *   return this.usersService.create(createUserDto);
 * }
 * ```
 */
export const Permissions = (...permissions: Permission[]) => SetMetadata(PERMISSIONS_KEY, permissions);
