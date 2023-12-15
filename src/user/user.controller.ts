import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, PrivateApi, PublicApi } from 'src/auth/auth.guard';
import { User } from 'src/entities/user.entity';
import { UserSignDto } from './dto/userSign.dto';
import { UserService } from './user.service';

@PublicApi()
@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) { }

    @Get()
    @PrivateApi()
    getAllUsers(): Promise<[User[], number]> {
        return this.userService.getAllUsers();
    }
    
    @Get(':id')
    @PrivateApi()
    getUser(@Param('id') id: number): Promise<User> {
        return this.userService.getUser(id)
    }

    @Post('signup')
    signup(@Body() dto: UserSignDto): Promise<User> {
        const { username, password } = dto
        return this.userService.signup(username, password)
    }
    @Post('signin')
    signin(@Body() dto: UserSignDto): Promise<{ accessToken: string }> {
        const { username, password } = dto
        return this.userService.signin(username, password);
    }

}
