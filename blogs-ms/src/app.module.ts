import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from '@/modules/posts/posts.module';
import { DatabaseModule } from '@/config/database/database.module';
import { validationSchema } from '@/config/env.validation';
import { RmqModule } from '@/config/rmq/rmq.module';
import { BLOGS_SERVICE } from '@/common/constants/services';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema
    }),
    DatabaseModule,
    PostsModule,
    RmqModule.register({ name: BLOGS_SERVICE }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
