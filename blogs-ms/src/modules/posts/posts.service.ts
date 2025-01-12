import { Inject, Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { ResourceNotFoundException } from '@/common/exceptions/resource-not-found.exception';
import { InvalidInputException } from '@/common/exceptions/invalid-input.exception';
import { UnexpectedErrorException } from '@/common/exceptions/unexpected-error.exception';
import { CreatePostDto } from '@/modules/posts/dto/create-post.dto';
import { UpdatePostDto } from '@/modules/posts/dto/update-post.dto';
import { ClientProxy } from '@nestjs/microservices';
import { BLOGS_SERVICE } from '@/common/constants/services';
import { Post } from '@/modules/posts/schemas/post.schema';
import { PostsRepository } from '@/modules/posts/posts.repository';
import { lastValueFrom } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    private readonly postsRepository: PostsRepository,
    @Inject(BLOGS_SERVICE) private blogsClient: ClientProxy
  ) {}

  /**
   * find all posts
   * @param userId User's unique identifier
   * @returns Array of posts
   */
  async findAll(userId: string): Promise<Post[]> {
    return await this.postsRepository.find({ 
      userId: new Types.ObjectId(userId) 
    });
  }

  /**
   * Creates a new post 
   * @param createPostDto Post creation data
   * @returns Newly created post object
   * @throws InvalidInputException if email already exists
   */
  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    try {
      // Validate required fields
      if (!createPostDto || !createPostDto.userId) {
        throw new InvalidInputException('UserId is required');
      }

      const postData = {
        title: createPostDto.title,
        content: createPostDto.content,
        userId: new Types.ObjectId(createPostDto.userId)
      };
      
      const post = await this.postsRepository.create(postData);
      await lastValueFrom(this.blogsClient.emit('post_created', post));
      return post;
    } catch (error) {
      this.logger.error('Error creating post:', error);
      if (error instanceof InvalidInputException) {
        throw error;
      }
      throw new UnexpectedErrorException('Error creating post');
    }
  }

  /**
   * Retrieves a post 
   * @param id Post's unique identifier
   * @param userId User's unique identifier
   * @returns Post object
   * @throws ResourceNotFoundException if post not found
   * @throws UnauthorizedException if user is not authorized
   * @throws InvalidInputException if invalid id format
   */
  async findPost(id: string, userId: string): Promise<Post> {
    try {
      // Validate ObjectId format
      if (!Types.ObjectId.isValid(id)) {
        throw new InvalidInputException('Invalid post ID format');
      }
      if (!Types.ObjectId.isValid(userId)) {
        throw new InvalidInputException('Invalid user ID format');
      }

      // First find the post by ID
      const post = await this.postsRepository.findOne({ 
        _id: new Types.ObjectId(id)
      });

      if (!post) {
        throw new ResourceNotFoundException('Post not found');
      }

      // Check if the user is authorized to access this post
      if (post.userId.toString() !== new Types.ObjectId(userId).toString()) {
        this.logger.warn(
          `Unauthorized access attempt - Post ID: ${id}, User ID: ${userId}`
        );
        throw new UnauthorizedException('You are not authorized to access this post');
      }

      return post;
    } catch (error) {
      this.logger.error('Error finding post:', error);
      
      if (error instanceof InvalidInputException ||
          error instanceof UnauthorizedException ||
          error instanceof ResourceNotFoundException) {
        throw error;
      }

      // Handle unexpected errors
      throw new UnexpectedErrorException(
        'Error finding post',
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Updates post information
   * @param id Post's unique identifier
   * @param updatePostDto Data to update
   * @param userId User's unique identifier
   * @returns Updated post object
   * @throws ResourceNotFoundException if post not found
   * @throws UnauthorizedException if user is not authorized
   * @throws InvalidInputException if invalid id format
   */
  async updatePost(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<Post> {
    try {
      // Validate ObjectId format
      if (!Types.ObjectId.isValid(id)) {
        throw new InvalidInputException('Invalid post ID format');
      }
      if (!Types.ObjectId.isValid(userId)) {
        throw new InvalidInputException('Invalid user ID format');
      }

      // First find the post by ID
      const existingPost = await this.postsRepository.findOne({ 
        _id: new Types.ObjectId(id)
      });
      
      if (!existingPost) {
        throw new ResourceNotFoundException('Post not found');
      }

      // Check if the user is authorized to update this post
      if (existingPost.userId.toString() !== new Types.ObjectId(userId).toString()) {
        this.logger.warn(
          `Unauthorized update attempt - Post ID: ${id}, User ID: ${userId}`
        );
        throw new UnauthorizedException('You are not authorized to update this post');
      }

      // Update the post
      const updatedPost = await this.postsRepository.findOneAndUpdate(
        { _id: new Types.ObjectId(id) },
        { $set: updatePostDto }
      );

      // Emit post updated event
      await lastValueFrom(this.blogsClient.emit('post_updated', updatedPost));
      
      return updatedPost;
    } catch (error) {
      this.logger.error('Error updating post:', error);
      
      if (error instanceof InvalidInputException ||
          error instanceof UnauthorizedException ||
          error instanceof ResourceNotFoundException) {
        throw error;
      }

      // Handle unexpected errors
      throw new UnexpectedErrorException(
        'Error updating post',
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Deletes a post
   * @param id Post's unique identifier
   * @param userId User's unique identifier
   * @throws ResourceNotFoundException if post not found
   * @throws UnauthorizedException if user is not authorized
   * @throws InvalidInputException if invalid id format
   */
  async deletePost(id: string, userId: string): Promise<void> {
    try {
      // Validate ObjectId format
      if (!Types.ObjectId.isValid(id)) {
        throw new InvalidInputException('Invalid post ID format');
      }
      if (!Types.ObjectId.isValid(userId)) {
        throw new InvalidInputException('Invalid user ID format');
      }

      // First find the post by ID
      const post = await this.postsRepository.findOne({ 
        _id: new Types.ObjectId(id)
      });
      
      if (!post) {
        throw new ResourceNotFoundException('Post not found');
      }

      // Check if the user is authorized to delete this post
      if (post.userId.toString() !== new Types.ObjectId(userId).toString()) {
        this.logger.warn(
          `Unauthorized deletion attempt - Post ID: ${id}, User ID: ${userId}`
        );
        throw new UnauthorizedException('You are not authorized to delete this post');
      }

      await this.postsRepository.deleteOne({ _id: new Types.ObjectId(id) });
      
      // Emit post deleted event only after successful deletion
      await lastValueFrom(this.blogsClient.emit('post_deleted', { id }));
    } catch (error) {
      this.logger.error('Error deleting post:', error);
      
      if (error instanceof InvalidInputException ||
          error instanceof UnauthorizedException ||
          error instanceof ResourceNotFoundException) {
        throw error;
      }

      // Handle unexpected errors
      throw new UnexpectedErrorException(
        'Error deleting post',
        error instanceof Error ? error : undefined
      );
    }
  }

  async handlePostCreated(post: Post): Promise<void> {
    this.logger.log(`Handling post created event for post: ${post._id}`);
    // Add any additional logic needed when a post is created
  }

  async handlePostUpdated(post: Post): Promise<void> {
    this.logger.log(`Handling post updated event for post: ${post._id}`);
    // Add any additional logic needed when a post is updated
  }

  async handlePostDeleted(postId: string): Promise<void> {
    this.logger.log(`Handling post deleted event for post: ${postId}`);
    // Add any additional logic needed when a post is deleted
  }
}
