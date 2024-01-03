import { Module } from '@nestjs/common'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { BoardModule } from './board/board.module'
import { ConfigModuleContainer, DBModuleContainer, JwtModuleContainer } from './config/module.container'
import { ReplyModule } from './reply/reply.module'
import { UserModule } from './user/user.module'
import { FileModule } from './file/file.module'
import { GlobalExceptionFilter } from './filter/exception.filter'
import { ExceptController } from './except/except.controller'
import { ExceptModule } from './except/except.module'
import { ExceptionModule } from './exception/exception.module'
import { AuditModule } from './audit/audit.module'
import { JwtAuthGuard } from './auth/auth.guard'

@Module({
  imports: [
    ConfigModuleContainer.forRoot(),
    DBModuleContainer.forRoot(__dirname),
    JwtModuleContainer.register(),
    BoardModule,
    UserModule,
    ReplyModule,
    FileModule,
    ExceptModule,
    ExceptionModule,
    AuditModule,
    // RequestContextModule,
  ],
  controllers: [ExceptController],
  providers: [
    { provide: APP_GUARD, useExisting: JwtAuthGuard },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
  ],
})
export class AppModule {}
