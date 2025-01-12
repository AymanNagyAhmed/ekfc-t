import { Module, DynamicModule } from '@nestjs/common';
import { RmqService } from '@/config/rmq/rmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [`amqp://${configService.get<string>('RMQ_USER')}:${configService.get<string>('RMQ_PASSWORD')}@${configService.get<string>('RMQ_HOST')}:${configService.get<string>('RMQ_PORT')}`],
                queue: configService.get<string>(`RMQ_${name.toUpperCase()}_QUEUE`),
                persistent: true,
                queueOptions: {
                  durable: true
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
