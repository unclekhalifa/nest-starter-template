import { Prisma } from '@prisma/client';

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from '../database';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    return this.database.user.create({ data: createUserDto });
  }

  async get(where: Prisma.UserWhereUniqueInput, select?: Prisma.UserSelect) {
    const query = select ? { where, select } : { where };
    const user = await this.database.user.findUnique(query as Prisma.UserFindUniqueArgs);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
