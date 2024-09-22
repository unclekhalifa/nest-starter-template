import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nest-workspace/auth';

@Injectable()
export class AuthService {
  private readonly secret: string;

  constructor(private readonly users: UsersService, private readonly config: ConfigService) {
    this.secret = this.config.get('jwt.secret') as string;
  }

  async create({ email, password }: CreateAuthDto) {
    const { id, role } = await this.validate(email, password);

    const payload = { id, role };

    return {
      'auth_cookie': JwtService.encode(this.secret, payload),
    };
  }

  private async validate(email: string, password: string) {
    const user = await this.users.get({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
