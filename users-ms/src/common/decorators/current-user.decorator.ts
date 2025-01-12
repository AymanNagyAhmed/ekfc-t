import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@/modules/users/schemas/user.schema';

export const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const user = getCurrentUserByContext(context);
    if (!user) {
      throw new Error('User not found in request');
    }
    return user;
  },
);