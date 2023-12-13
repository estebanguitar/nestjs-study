import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './auth/auth.guard';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'board',
      synchronize: false,
      logging: true,
      entities: [`${__dirname}/**/entities/*.entity.{js,ts}`]
    }),
    BoardModule, UserModule, AuthModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useExisting: AuthGuard }
  ],
})
export class AppModule { }
