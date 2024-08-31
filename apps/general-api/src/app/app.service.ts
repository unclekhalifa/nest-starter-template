import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database';

@Injectable()
export class AppService {
  constructor(private readonly database: DatabaseService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async createUser(email: string) {
    const User = await this.database.user.create({ data: { email: 'John@mail.com' } });
    return User;
  }
}
