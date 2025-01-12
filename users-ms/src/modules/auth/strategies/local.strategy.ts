import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  /**
   * Validates the user credentials
   * @param email User's email
   * @param password User's password
   * @returns User object
   * @throws UnauthorizedException if credentials are invalid
   */
  async validate(email: string, password: string) {
    try {
      const user = await this.usersService.validateUser(email, password);
      return user;
    } catch (error) {
      // Convert any error to UnauthorizedException with a generic message
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}