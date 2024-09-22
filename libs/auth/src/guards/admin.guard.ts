import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { user } = context.switchToHttp().getRequest();
    console.log('admin', user);
    return user.role === 'admin';
  }
}
