import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth.guard';
import { BoardModule } from './board/board.module';
import { ConfigModuleContainer, DBModuleContainer, JwtModuleContainer } from './config/module.container';
import { ReplyModule } from './reply/reply.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModuleContainer.forRoot(),
    DBModuleContainer.forRoot(__dirname),
    JwtModuleContainer.register(),
    BoardModule, 
    UserModule, 
    ReplyModule, FileModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useExisting: JwtAuthGuard }
  ],
})
export class AppModule { }