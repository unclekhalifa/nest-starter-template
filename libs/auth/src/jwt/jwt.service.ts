import * as jwt from 'jsonwebtoken';

export abstract class JwtService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static encode(secret: string, payload: any): string {
    return jwt.sign(payload, secret);
  }
}
