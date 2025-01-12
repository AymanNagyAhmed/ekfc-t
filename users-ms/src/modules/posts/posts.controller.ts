import { Controller, Delete, Get, Post, Put, Body, Param, UseGuards, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/modules/users/schemas/user.schema';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { postResponseProperties, unauthorizedResponseSchema, notFoundResponseSchema } from '@/common/constants/swagger.constants';

@ApiTags('4. Posts')
@Controller('posts')
@UseGuards(JwtAuthGuard)
@ApiSecurity('bearer')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ 
    status: 201, 
    description: 'Post created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'number', example: 201 },
        message: { type: 'string', example: 'Post created successfully' },
        path: { type: 'string', example: '/posts' },
        timestamp: { type: 'string', example: '2024-12-25T11:00:00.000Z' },
        data: {
          type: 'object',
          properties: postResponseProperties
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
  async create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: User) {
    return this.postsService.createPost(createPostDto, user._id.toString());
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts for current user' })
  @ApiResponse({ 
    status: 200, 
    description: 'Posts retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Posts retrieved successfully' },
        path: { type: 'string', example: '/posts' },
        timestamp: { type: 'string', example: '2024-12-25T11:00:00.000Z' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: postResponseProperties
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized',
    schema: unauthorizedResponseSchema
  })
  async findAll(@CurrentUser() user: User) {
    return this.postsService.findAll(user._id.toString());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Post retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Post retrieved successfully' },
        path: { type: 'string', example: '/posts/:id' },
        timestamp: { type: 'string', example: '2024-12-25T11:00:00.000Z' },
        data: {
          type: 'object',
          properties: postResponseProperties
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized',
    schema: unauthorizedResponseSchema
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Post not found',
    schema: notFoundResponseSchema
  })
  async findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.postsService.getPost(id, user._id.toString());
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ 
    status: 200, 
    description: 'Post updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Post updated successfully' },
        path: { type: 'string', example: '/posts/:id' },
        timestamp: { type: 'string', example: '2024-12-25T11:00:00.000Z' },
        data: {
          type: 'object',
          properties: postResponseProperties
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized',
    schema: unauthorizedResponseSchema
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Post not found',
    schema: notFoundResponseSchema
  })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @CurrentUser() user: User) {
    return this.postsService.updatePost(id, updatePostDto, user._id.toString());
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Post deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Post deleted successfully' },
        path: { type: 'string', example: '/posts/:id' },
        timestamp: { type: 'string', example: '2024-12-25T11:00:00.000Z' },
        data: {
          type: 'object',
          properties: postResponseProperties
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized',
    schema: unauthorizedResponseSchema
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Post not found',
    schema: notFoundResponseSchema
  })
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.postsService.deletePost(id, user._id.toString());
  }
}
