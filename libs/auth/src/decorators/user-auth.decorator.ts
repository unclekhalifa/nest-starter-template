import { applyDecorators, CanActivate, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards';
import { ApiCookieAuth } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/ban-types
export function UserAuth(...guards: (Function | CanActivate)[]) {
  return applyDecorators(
    ApiCookieAuth('auth_cookie'),
    UseGuards(JwtGuard, ...guards),
  );
}
