import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users';
import { ConfigModule } from '@nestjs/config';
import { AuthModule as InternalAuthModule } from '@nest-workspace/auth';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    InternalAuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
