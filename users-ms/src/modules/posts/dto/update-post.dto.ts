import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Post title (optional)',
    example: 'Updated Blog Post Title',
    minLength: 6,
    required: false
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  readonly title?: string;

  @ApiProperty({
    description: 'Post content (optional)',
    example: 'This is the updated content of my blog post.',
    required: false
  })
  @IsString()
  @IsOptional()
  readonly content?: string;
}