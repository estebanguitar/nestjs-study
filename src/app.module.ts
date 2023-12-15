import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './auth/auth.guard';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { ReplyModule } from './reply/reply.module';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'board',
  synchronize: false,
  logging: true,
  entities: [`${__dirname}/**/entities/*.entity.{js,ts}`]
})

@Module({
  imports: [
    typeOrmModule,
    BoardModule, UserModule, ReplyModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useExisting: JwtAuthGuard }
  ],
})
export class AppModule { }
