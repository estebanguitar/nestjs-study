import { Global, Module } from '@nestjs/common'
import { HTTPException } from './http.exception'
import { DatabaseException } from './database.exception'
import { BizLogicException } from './bizLogic.exception'
import { Exception } from './exception'

@Global()
@Module({
  imports: [Exception, HTTPException, DatabaseException, BizLogicException],
  controllers: [],
  providers: [],
  exports: [HTTPException, DatabaseException, BizLogicException],
})
export class ExceptionModule {}
