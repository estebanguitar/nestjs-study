import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiPermissionPublic } from 'src/auth/auth.guard';
import { User } from 'src/entities/user.entity';
import { Userdto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) { }
    
    @Post('signup')
    @ApiPermissionPublic()
    signup(@Body() dto: Userdto): Promise<User> {
        const { username, password } = dto
        return this.userService.signup(username, password)
    }
    @Post('signin')
    @ApiPermissionPublic()
    signin(@Body() dto: Userdto): Promise<{ accessToken: string }> {
        const { username, password } = dto
        return this.userService.signin(username, password);
    }
    
    @Get('verify')
    verify(@Request() req: Request): void {
        console.log(req.headers['authorization']);
        
        // this.userService.verify(req);
    }

}
