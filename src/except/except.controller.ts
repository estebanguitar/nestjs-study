import { Controller, Get } from '@nestjs/common'
import { PublicApi } from '../auth/auth.guard'
import { DatabaseException } from '../exception/database.exception'
import { BizLogicException } from '../exception/bizLogic.exception'
import { HTTPException } from '../exception/http.exception'

@PublicApi()
@Controller('except')
export class ExceptController {
  @Get()
  tmp() {
    throw new HTTPException('Unauthorized')
  }
  // HttpException, DatabaseException, BizLoginException
  @Get('/db')
  tmp3() {
    throw new DatabaseException('get3')
  }
  @Get('/:test')
  tmp2() {
    throw new BizLogicException('get2')
  }
}
