import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.getRmqUrl()],
        queue: this.getQueue(queue),
        noAck,
        persistent: true,
        queueOptions: {
          durable: true
        },
      },
    };
  }

  private getRmqUrl(): string {
    return `amqp://${this.configService.get<string>('RMQ_USER')}:${this.configService.get<string>('RMQ_PASSWORD')}@${this.configService.get<string>('RMQ_HOST')}:${this.configService.get<string>('RMQ_PORT')}`;
  }

  private getQueue(queue: string): string {
    return this.configService.get<string>(`RMQ_${queue.toUpperCase()}_QUEUE`);
  }

  ack(context: RmqContext): void {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}

