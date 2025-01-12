import { IsString, IsOptional, Matches, IsEmail } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiPropertyOptional({
    description: 'User\'s email',
    example: 'test@test.com'
  })
  @IsOptional()
  @IsString()
  readonly email?: string;

  @ApiPropertyOptional({
    description: 'User\'s password',
    example: '123456789'
  })
  @IsOptional()
  @IsString()
  readonly password?: string;
}
