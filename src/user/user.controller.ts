import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common'
import { PrivateApi, PublicApi } from 'src/auth/auth.guard'
import { Tokens } from 'src/config/config.type'
import { User } from 'src/entities/user.entity'
import { UserSignDto } from './dto/userSign.dto'
import { UserService } from './user.service'

@PublicApi()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO
  // @Post('/generate/qr')
  // @PrivateApi()
  // generateQr(@Req() request): Promise<{ imageUrl: string }> {
  //   return this.userService.generateQr(request.user)
  // }

  @Get()
  @PrivateApi()
  getAllUsers(): Promise<[User[], number]> {
    return this.userService.getAllUsers()
  }

  @Get(':id')
  @PrivateApi()
  getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getUser(id)
  }

  @Post('signup')
  signup(@Body() dto: UserSignDto): Promise<User> {
    const { username, password, email } = dto
    return this.userService.signup(username, password, email)
  }

  @Post('signin')
  signin(@Body() dto: UserSignDto): Promise<Tokens> {
    const { username, password } = dto
    return this.userService.signin(username, password)
  }

  @Post('refresh-token')
  refreshToken(@Request() request): Promise<Tokens> {
    const refreshToken = request.cookies['refresh-token']
    return this.userService.refresh(refreshToken)
  }

  @Post('change-password')
  changePassword(): Promise<void> {
    return this.userService.changePassword()
  }

  // TODO
  // @Get('tmp/tmp')
  // tmp(@Req() user: User): Promise<{ secret: string; otpAuthUrl: string }> {
  //   return this.userService.generateTwoFactorAuthSecret(user)
  // }
}
