import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsString, IsOptional, MinLength } from 'class-validator';
import { CreatePostDto } from '@/modules/posts/dto/create-post.dto';

export class UpdatePostDto extends PartialType(
  OmitType(CreatePostDto, ['userId'] as const),
) {}