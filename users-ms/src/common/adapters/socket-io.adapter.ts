import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { ConfigService } from '@nestjs/config';

export class SocketIoAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const wsPort = this.configService.get<number>('WS_PORT');
    options = {
      ...options,
      cors: {
        origin: '*',
        credentials: true
      }
    };
    
    const server = super.createIOServer(wsPort, options);
    return server;
  }
} 