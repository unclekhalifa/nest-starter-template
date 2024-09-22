import cookieParser from 'cookie-parser';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users';
import Config from './config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Config],
    }),
    UsersModule, AuthModule, DatabaseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [];
    middlewares.push(cookieParser());

    consumer.apply(...middlewares).forRoutes('*');
  }
}
