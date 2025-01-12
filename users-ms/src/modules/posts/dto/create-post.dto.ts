import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'My First Blog Post',
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  readonly title: string;

  @ApiProperty({
    description: 'Post content',
    example: 'This is the content of my first blog post. It contains all the details and information I want to share.'
  })
  @IsString()
  readonly content: string;
}