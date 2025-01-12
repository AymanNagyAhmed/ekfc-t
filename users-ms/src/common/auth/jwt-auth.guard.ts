import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ClientProxy } from '@nestjs/microservices';
  import { catchError, Observable, tap } from 'rxjs';
  import { JwtService } from '@nestjs/jwt';
  import { USERS_SERVICE } from '@/common/constants/services';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(
        @Inject(USERS_SERVICE) private usersClient: ClientProxy,
        private readonly jwtService: JwtService,
    ) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const authentication = this.getAuthentication(context);
      return this.usersClient
        .send('validate_user', {
          Authentication: authentication,
        })
        .pipe(
          tap((res) => {
            this.addUser(res, context);
          }),
          catchError(() => {
            throw new UnauthorizedException();
          }),
        );
    }
  
    private getAuthentication(context: ExecutionContext) {
      let authentication: string;
      if (context.getType() === 'rpc') {
        authentication = context.switchToRpc().getData().Authentication;
      } else if (context.getType() === 'http') {
        authentication = context.switchToHttp().getRequest()
          .cookies?.Authentication;
      }
      if (!authentication) {
        throw new UnauthorizedException(
          'No value was provided for Authentication',
        );
      }
      return authentication;
    }
  
    private addUser(user: any, context: ExecutionContext) {
      if (context.getType() === 'rpc') {
        context.switchToRpc().getData().user = user;
      } else if (context.getType() === 'http') {
        context.switchToHttp().getRequest().user = user;
      }
    }
  }