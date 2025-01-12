import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const token = this.extractToken(client);
      if (!token) {
        throw new WsException('Missing auth token');
      }

      const payload = await this.jwtService.verifyAsync(token);
      client.handshake.auth.userId = payload.sub;
      return true;
    } catch (err) {
      console.error('WsJwtGuard error:', err);
      throw new WsException('Invalid credentials');
    }
  }

  private extractToken(client: Socket): string | undefined {

    const headerToken = client.handshake.headers.authentication || client.handshake.headers.Authentication;
    if (headerToken) {
      const token = Array.isArray(headerToken) ? headerToken[0] : headerToken;
      if (token && token.split(' ')[0].toLowerCase() === 'bearer') {
        return token.split(' ')[1];
      }
    }
    const authToken = client.handshake.auth?.token;
    if (authToken) return authToken;
    const queryToken = client.handshake.query?.token;
    if (typeof queryToken === 'string') return queryToken;

    return undefined;
  }
}