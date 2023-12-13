import { Controller } from '@nestjs/common';

@Controller('auth')
// @ApiPermissionPublic()
export class AuthController {

    // constructor(private readonly service: AuthService) { }

    // @Post('join')
    // join(@Body() dto: AuthDto): Promise<Auth> {
    //     const { username, password } = dto
    //     return this.service.join(username, password)
    // }
    // @Post('signin')
    // signin(@Body() dto: AuthDto): Promise<{ accessToken: string }> {
    //     const { username, password } = dto
    //     return this.service.signin(username, password)
    // }


    // /* TODO delete */
    // @Get('verify')
    // verify(@Request() request: Request): Promise<Auth> {
    //     return null
    // }

    // @Post('signout')
    // signout(@Body() dto: AuthDto): Promise<void> {
    //     return null
    // }

}

