import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { error, log } from 'console';
import e from 'express';
import { JwtVerify, Tokens } from 'src/config/config.type';
import { User } from 'src/entities/user.entity';
import { aesDecrypt, aesEncrypt } from 'src/util/aesCrypto.util';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }


    async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id, deletedAt: IsNull() },
            // relations: ['boards']
        })

        if (user === null) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return user
    }
    async getAllUsers(): Promise<[User[], number]> {
        return await this.userRepository.findAndCount({
            where: { deletedAt: IsNull() }
        })
    }

    async signup(username: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                username
            }
        });

        if (user !== null)
            throw new HttpException('Already Exist username', HttpStatus.BAD_REQUEST)

        return await this.userRepository.save(
            this.userRepository.create({
                username,
                password: aesEncrypt(password),
                createdAt: new Date()
            })
        )
    }
    async signin(username: string, password: string): Promise<Tokens> {
        const user = await this.userRepository.findOne({
            where: {
                username,
            }
        })

        if (user === null || aesDecrypt(user?.password) !== password)
            throw new UnauthorizedException()

        const now = new Date().getTime()

        const payload: JwtVerify = {
            id: user.id,
            username: user.username,
            timestamp: now
        }

        const accessToken = this.issueAccessToken(payload)
        const refreshToken = this.issueRefreshToken(payload)

        return { accessToken, refreshToken }
    }


    async changePassword(): Promise<void> {
        const users = await this.userRepository.find()

        users.forEach(u => {
            u.password = aesEncrypt('1234')
            this.userRepository.save(u)
        })
    }

    private verify(token: string): boolean {

        try {
            const verify: JwtVerify = this.jwtService.verify(token, {
                secret: process.env.REFRESH_JWT_SECRET
            })
        } catch (e) {
            error(e.message)
            return false
        }
        return true
    }

    private issueAccessToken(payload: JwtVerify): string {
        return this.jwtService.sign(payload, {
            algorithm: 'HS256',
        });
    }
    private issueRefreshToken(payload: JwtVerify): string {
        return this.jwtService.sign(payload, {
            algorithm: 'HS256',
            secret: process.env.REFRESH_JWT_SECRET,
            expiresIn: parseInt(process.env.REFRESH_JWT_EXPIRES)
        })
    }
    async refresh(refreshToken: any): Promise<Tokens> {
        if (!this.verify(refreshToken))
            throw new UnauthorizedException()

        const originalPayload: JwtVerify = this.jwtService.decode(refreshToken);
        const { id, username } = originalPayload;
        const payload: JwtVerify = {
            id,
            username,
            timestamp: new Date().getTime()
        }

        //TODO 유저 검증

        return { 
            accessToken: this.issueAccessToken(payload), 
            refreshToken: this.issueRefreshToken(payload) 
        }
    }
}
