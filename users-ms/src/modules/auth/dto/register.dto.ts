import { IsString, IsEmail, IsOptional, IsBoolean, IsArray, IsEnum, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@/modules/users/enums/user-role.enum';

export class RegisterDto {


  @ApiProperty({
    description: 'User\'s email address',
    example: 'test@test.com'
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'User\'s password (min 8 chars, must contain uppercase, lowercase and number)',
    example: '123456789'
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number'
  })
  readonly password: string;

}
