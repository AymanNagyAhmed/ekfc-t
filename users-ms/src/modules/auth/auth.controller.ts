import { Controller, Post, UseGuards, Res, Get, Body, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '@/modules/auth/auth.service';
import { LocalAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/modules/users/schemas/user.schema';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiSecurity, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from '@/modules/auth/dto/register.dto';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { ApiResponse, LoginResponse } from '@/common/interfaces/api-response.interface';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { MessagePattern } from '@nestjs/microservices';
import { ApiResponseUtil } from '@/common/utils/api-response.util';

@ApiTags('2. Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegisterDto })
  @SwaggerResponse({ 
    status: 201, 
    description: 'User registered successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'number', example: 201 },
        message: { type: 'string', example: 'User registered successfully' },
        path: { type: 'string', example: '/api/auth/register' },
        timestamp: { type: 'string', example: '2024-12-25T11:00:00.000Z' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            email: { type: 'string', example: 'test@test.com' },
            isEmailVerified: { type: 'boolean', example: false },
            role: { type: 'string', example: 'user' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', example: '2024-12-25T11:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-12-25T11:00:00.000Z' }
          }
        }
      }
    }
  })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<ApiResponse<User>> {
    const user = await this.authService.register(registerDto);
    return ApiResponseUtil.success(
      user,
      'User registered successfully',
      '/api/auth/register',
      HttpStatus.CREATED
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @SwaggerResponse({ 
    status: 200, 
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Login successful' },
        path: { type: 'string', example: '/api/auth/login' },
        timestamp: { type: 'string', example: '2024-12-26T15:57:37.887Z' },
        data: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                _id: { type: 'string', example: '676d7af12df61838c1c700dc' },
                email: { type: 'string', example: 'test@test.com' },
                isEmailVerified: { type: 'boolean', example: false },
                role: { type: 'string', example: 'user' },
                isActive: { type: 'boolean', example: true },
                createdAt: { type: 'string', example: '2024-12-26T15:49:05.499Z' },
                updatedAt: { type: 'string', example: '2024-12-26T15:49:05.499Z' }
              }
            },
            access_token: { 
              type: 'string', 
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' 
            }
          }
        }
      }
    }
  })
  @SwaggerResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid credentials',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Invalid email or password' },
        path: { type: 'string', example: '/api/auth/login' },
        timestamp: { type: 'string', example: '2024-12-26T15:47:37.418Z' }
      }
    }
  })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiResponse<LoginResponse>> {
    const loginData = await this.authService.login(user, response);
    return ApiResponseUtil.success(
      loginData,
      'Login successful',
      '/api/auth/login',
      HttpStatus.OK
    );
  }

  @ApiOperation({ summary: 'Logout current user' })
  @SwaggerResponse({ 
    status: 200, 
    description: 'Logout successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Operation successful' },
        path: { type: 'string', example: '/api/auth/logout' },
        timestamp: { type: 'string', example: '2024-12-25T11:01:37.650Z' },
        data: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Successfully logged out' }
          }
        }
      }
    }
  })
  @SwaggerResponse({ 
    status: 401, 
    description: 'Unauthorized - User not authenticated',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'No authentication token provided' },
        path: { type: 'string', example: '/api/auth/logout' },
        timestamp: { type: 'string', example: '2024-12-25T11:00:05.384Z' }
      }
    }
  })
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(
    @Req() request: Request, 
    @Res({ passthrough: true }) response: Response
  ): ApiResponse<{ message: string }> {
    this.authService.logout(response);
    return ApiResponseUtil.success(
      { message: 'Successfully logged out' },
      'Logout successful',
      '/api/auth/logout',
      HttpStatus.OK
    );
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: 'validate_user' })
  async validateUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
