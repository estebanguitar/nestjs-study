import { Body, Controller, Get, Param, Post, Request, Res, Response } from '@nestjs/common';
import { PrivateApi, PublicApi } from 'src/auth/auth.guard';
import { User } from 'src/entities/user.entity';
import { UserSignDto } from './dto/userSign.dto';
import { UserService } from './user.service';
import { log } from 'console';
import { response } from 'express';
import { Tokens } from 'src/config/config.type';

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
    signin(@Body() dto: UserSignDto): Promise<Tokens> {
        const { username, password } = dto
        return this.userService.signin(username, password)
    }

    @Post('refresh-token')
    refreshToken(@Request() request): Promise<Tokens> {
        const refreshToken = request.cookies['refresh-token'];
        return this.userService.refresh(refreshToken)
    }

    @Post('change-password')
    changePassword(): Promise<void> {
        return this.userService.changePassword()
    }
}
