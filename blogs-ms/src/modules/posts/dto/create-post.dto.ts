import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {

  @ApiProperty({
    description: 'Post title',
    example: 'post 1'
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Post content',
    example: 'post 1 content'
  })
  @IsString()
  readonly content: string;

  @ApiProperty({
    description: 'Post Author Id',
    example: '67668222525f0b148b57def3'
  })
  @IsString()
  @IsOptional()
  readonly userId?: string;


}