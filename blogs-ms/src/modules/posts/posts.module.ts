import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from '@/modules/posts/posts.controller';
import { PostsService } from '@/modules/posts/posts.service';
import { Post, PostSchema } from '@/modules/posts/schemas/post.schema';
import { PostsRepository } from '@/modules/posts/posts.repository';
import { RmqModule } from '@/config/rmq/rmq.module';
import { BLOGS_SERVICE } from '@/common/constants/services';
import { AuthModule } from '@/common/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
    ]),
    RmqModule.register({ name: BLOGS_SERVICE }),
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository,
  ],
  exports: [PostsService],
})
export class PostsModule {}
