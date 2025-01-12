import { Controller, Get, Post, Put, Delete, Param, Body, Req, Patch, UseFilters } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { Request } from 'express';
import { PostsService } from '@/modules/posts/posts.service';
import { ApiResponse } from '@/common/interfaces/api-response.interface';
import { Post as PostSchema } from '@/modules/posts/schemas/post.schema';
import { CreatePostDto } from '@/modules/posts/dto/create-post.dto';
import { UpdatePostDto } from '@/modules/posts/dto/update-post.dto';
import { ApiResponseUtil } from '@/common/utils/api-response.util';
import { HTTP_STATUS } from '@/common/constants/api.constants';
import { AllExceptionsFilter } from '@/common/filters/rpc-exception.filter';
import { Logger } from '@nestjs/common';

@Controller()
@UseFilters(new AllExceptionsFilter())
export class PostsController {
    private readonly logger = new Logger(PostsController.name);

    constructor(private readonly postsService: PostsService) {}

    // Event Pattern Handlers
    @EventPattern('post_created')
    async handlePostCreated(post: PostSchema) {
        // Handle post created event
        this.postsService.handlePostCreated(post);
    }

    @EventPattern('post_updated')
    async handlePostUpdated(post: PostSchema) {
        // Handle post updated event
        this.postsService.handlePostUpdated(post);
    }

    @EventPattern('post_deleted')
    async handlePostDeleted(data: { id: string }) {
        // Handle post deleted event
        this.postsService.handlePostDeleted(data.id);
    }

    // Message Pattern Handlers
    @MessagePattern({ cmd: 'create_post' })
    async createPost(data: CreatePostDto): Promise<ApiResponse<PostSchema>> {
        // Log the received data for debugging
        this.logger.debug('Received create post data:', data);
        
        const post = await this.postsService.createPost(data);
        return ApiResponseUtil.success(
            post,
            'Post created successfully',
            '/posts',
            HTTP_STATUS.CREATED
        );
    }

    @MessagePattern({ cmd: 'get_posts'})
    async getPosts(data: { userId: string }): Promise<ApiResponse<PostSchema[]>> {
        const posts = await this.postsService.findAll(data.userId);
        return ApiResponseUtil.success(
            posts,
            'Posts retrieved successfully',
            '/posts'
        );
    }

    @MessagePattern({ cmd: 'get_post' })
    async getPost(data: { id: string, userId: string }): Promise<ApiResponse<PostSchema>> {
        const post = await this.postsService.findPost(data.id, data.userId);
        return ApiResponseUtil.success(
            post,
            'Post retrieved successfully',
            `/posts/${data.id}`
        );
    }

    @MessagePattern({ cmd: 'update_post' })
    async updatePost(data: {id: string, updateData: UpdatePostDto, userId: string}): Promise<ApiResponse<PostSchema>> {
        const post = await this.postsService.updatePost(data.id, data.updateData, data.userId);
        return ApiResponseUtil.success(
            post,
            'Post updated successfully',
            `/posts/${data.id}`
        );
    }

    @MessagePattern({ cmd: 'delete_post' })
    async deletePost(data: { id: string, userId: string }): Promise<ApiResponse<void>> {
        await this.postsService.deletePost(data.id, data.userId);
        return ApiResponseUtil.success(
            null,
            'Post deleted successfully',
            `/posts/${data.id}`
        );
    }
}
