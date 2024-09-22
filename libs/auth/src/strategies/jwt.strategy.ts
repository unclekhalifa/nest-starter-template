import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static secret: string | undefined;
  constructor(private readonly config: ConfigService) {
    JwtStrategy.secret = config.get('jwt.secret');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extract]),
      ignoreExpiration: false,
      secretOrKey: JwtStrategy.secret,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static extract(req: any) {
    const attribute = "auth_cookie";

    if (req?.cookies?.[attribute]?.length > 0) {
      console.log('cookie', req.cookies[attribute]);
      return req.cookies[attribute];
    }

    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload: any) {
    return { id: payload.id, role: payload.role };
  }
}
