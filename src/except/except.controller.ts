import { Controller, Get, UnauthorizedException } from '@nestjs/common'
import { PublicApi } from '../auth/auth.guard'

@PublicApi()
@Controller('except')
export class ExceptController {
  @Get()
  tmp() {
    throw new UnauthorizedException('Unauthorized')
  }
  // HTTPException, DatabaseException, BizLoginException
}
