import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminAuth } from '@nest-workspace/auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AdminAuth()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
