import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { RmqModule } from '@/config/rmq/rmq.module';
import { USERS_SERVICE } from '@/common/constants/services';

@Module({
  imports: [RmqModule.register({ name: USERS_SERVICE })],
  exports: [RmqModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}