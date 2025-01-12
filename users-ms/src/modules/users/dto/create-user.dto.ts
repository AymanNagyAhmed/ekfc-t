import { IsString, IsEmail, IsOptional, IsBoolean, IsArray, IsEnum, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@/modules/users/enums/user-role.enum';

export class CreateUserDto {
  @ApiPropertyOptional({
    description: 'User\'s first name',
    example: 'John'
  })
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @ApiPropertyOptional({
    description: 'User\'s last name',
    example: 'Doe'
  })
  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @ApiProperty({
    description: 'User\'s email address',
    example: 'john.doe@example.com'
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'User\'s password (min 8 chars, must contain uppercase, lowercase and number)',
    example: 'Password123'
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number'
  })
  readonly password: string;

  @ApiPropertyOptional({
    description: 'Whether the user\'s email is verified',
    default: false
  })
  @IsOptional()
  @IsBoolean()
  readonly isEmailVerified?: boolean;

  @ApiPropertyOptional({
    description: 'User\'s role in the system',
    enum: UserRole,
    default: UserRole.USER
  })
  @IsOptional()
  @IsEnum(UserRole)
  readonly role?: UserRole;

  @ApiPropertyOptional({
    description: 'User\'s phone number in international format',
    example: '+1234567890'
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid international format'
  })
  readonly phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'Whether the user account is active',
    default: true
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
