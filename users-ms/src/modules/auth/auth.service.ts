import { Injectable, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '@/modules/users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { ApiResponse, LoginResponse, TokenPayload } from '@/common/interfaces/api-response.interface';
import { UsersService } from '@/modules/users/users.service';
import { ApiResponseUtil } from '@/common/utils/api-response.util';
import { TimeUtil } from '@/common/utils/time.util';
import { UserRole } from '@/modules/users/enums/user-role.enum';



@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const createUserDto = {
      ...registerDto,
      role: UserRole.USER,
      isActive: true,
      isEmailVerified: false
    };

    return this.usersService.createUser(createUserDto);
  }

  async login(user: User, response: Response): Promise<LoginResponse> {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');
    const expiresInSeconds = TimeUtil.parseDurationToSeconds(expiresIn);

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + expiresInSeconds);

    const access_token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', access_token, {
      httpOnly: true,
      expires,
      sameSite: 'strict',
      path: '/api'
    });

    return {
      user,
      access_token,
    };
  }

  logout(response: Response) {
    response.clearCookie('Authentication', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api'
    });
  }

  async validateUser(authentication: string): Promise<User> {
    const payload = this.jwtService.verify(authentication);
    return this.usersService.findOne(payload.userId);
  }
}