import { Controller, Get, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from './schemas/user.schema';
import { ApiResponseUtil } from '@/common/utils/api-response.util';
import { ApiResponse as IApiResponse } from '@/common/interfaces/api-response.interface';

// Define a reusable response schema object
const userResponseProperties = {
  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
  firstName: { type: 'string', example: 'John' },
  lastName: { type: 'string', example: 'Doe' },
  email: { type: 'string', example: 'test@test.com' },
  isEmailVerified: { type: 'boolean', example: true },
  role: { type: 'string', example: 'user' },
  phoneNumber: { type: 'string', example: '+1234567890' },
  isActive: { type: 'boolean', example: true },
  fullName: { type: 'string', example: 'John Doe' },
  createdAt: { type: 'string', example: '2024-03-20T10:00:00.000Z' },
  updatedAt: { type: 'string', example: '2024-03-20T10:00:00.000Z' }
};

// Add this response schema for unauthorized
const unauthorizedResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: false },
    statusCode: { type: 'number', example: 401 },
    message: { type: 'string', example: 'You are not authorized to access this resource' },
    path: { type: 'string', example: '/users' },
    timestamp: { type: 'string', example: '2024-03-20T10:00:00.000Z' }
  }
};

@ApiTags('3. Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiSecurity('bearer')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Profile retrieved successfully' },
        path: { type: 'string', example: '/users/profile' },
        timestamp: { type: 'string', example: '2024-03-20T10:00:00.000Z' },
        data: {
          type: 'object',
          properties: userResponseProperties
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized',
    schema: unauthorizedResponseSchema
  })
  async getProfile(@CurrentUser() user: User): Promise<IApiResponse<User>> {
    const profile = await this.usersService.findOne(user._id.toString());
    return ApiResponseUtil.success(
      profile,
      'Profile retrieved successfully',
      '/users/profile',
      HttpStatus.OK
    );
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiBody({
    description: 'User update fields',
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'John' },
        lastName: { type: 'string', example: 'Doe' },
        email: { type: 'string', example: 'test@test.com' },
        phoneNumber: { type: 'string', example: '+1234567890' }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'User updated successfully' },
        path: { type: 'string', example: '/users/:id' },
        timestamp: { type: 'string', example: '2024-03-20T10:00:00.000Z' },
        data: {
          type: 'object',
          properties: userResponseProperties
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized',
    schema: unauthorizedResponseSchema
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: User
  ): Promise<IApiResponse<User>> {
    const updatedUser = await this.usersService.updateUser(user._id.toString(), updateUserDto);
    return ApiResponseUtil.success(
      updatedUser,
      'User updated successfully',
      '/users/profile',
      HttpStatus.OK
    );
  }

  @Delete('profile')
  @ApiOperation({ summary: 'Delete current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'User deleted successfully' },
        path: { type: 'string', example: '/api/users/profile' },
        timestamp: { type: 'string', example: '2024-03-20T10:00:00.000Z' },
        data: {
          type: 'null',
          example: null
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
        path: { type: 'string', example: '/api/users/profile' },
        timestamp: { type: 'string', example: '2024-03-20T10:00:00.000Z' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@CurrentUser() user: User): Promise<IApiResponse<null>> {
    await this.usersService.deleteUser(user._id.toString());
    return ApiResponseUtil.success(
      null,
      'User deleted successfully',
      '/api/users/profile',
      HttpStatus.OK
    );
  }
}
