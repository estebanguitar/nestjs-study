import { Controller, Get } from '@nestjs/common'
import { TmpService } from './tmp.service'
import { PublicApi } from '../auth/auth.guard'
import { CryptoUtil } from '../util/crypto.util'

@PublicApi()
@Controller('tmp')
export class TmpController {
  constructor(private readonly tmpService: TmpService) {}

  @Get()
  exc() {
    const pwd = '1234'
    const c1 = new CryptoUtil('SHA-256', 'AES-256-CBC', 16, 'base64')
    const c2 = new CryptoUtil('MD5', 'AES-128-CBC', 16, 'base64')

    const c1Enc = c1.encrypt(pwd)
    const c2Enc = c2.encrypt(pwd)
    console.log(c1Enc)
    console.log(c2Enc)
    console.log(c1.decrypt(c1Enc))
    console.log(c2.decrypt(c2Enc))
  }
}
