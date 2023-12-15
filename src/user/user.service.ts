import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
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
    async signin(username: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findOne({
            where: {
                username,
            }
        })

        if (user === null || aesDecrypt(user?.password) !== password)
            throw new UnauthorizedException()

        const now = new Date().getTime()

        const payload = {
            id: user.id,
            username: user.username,
            timestamp: now
        }

        const accessToken = this.jwtService.sign(payload, {
            algorithm: 'HS256',
        });

        return { accessToken }
    }

}
