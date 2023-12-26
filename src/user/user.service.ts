<<<<<<< Updated upstream
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtVerify, Tokens } from 'src/config/config.type'
import { User } from 'src/entities/user.entity'
import { aesDecrypt, aesEncrypt } from 'src/util/aesCrypto.util'
import { IsNull, Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['boards', 'replies´'],
    })

=======
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { error } from 'console'
import { JwtVerify, Tokens } from 'src/config/config.type'
import { User } from 'src/entities/user.entity'
import { IsNull, Repository } from 'typeorm'
import { CryptoUtil } from '../util/crypto.util'
import * as process from 'process'

@Injectable()
export class UserService {
  private readonly cryptoUtil

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    this.cryptoUtil = new CryptoUtil('SHA-256', 'AES-256-CBC', 16, 'base64')
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: IsNull() },
      // relations: ['boards']
    })

>>>>>>> Stashed changes
    if (user === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return user
  }
<<<<<<< Updated upstream
  async getAllUsers(): Promise<[User[], number]> {
    return await this.userRepository.findAndCount({
      where: { deletedAt: IsNull() },
    })
  }

  async signup(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    })

    if (user !== null)
      throw new HttpException('Already Exist username', HttpStatus.BAD_REQUEST)

    return await this.userRepository.save(
      this.userRepository.create({
        username,
        password: aesEncrypt(password),
        createdAt: new Date(),
      }),
    )
  }
  async signin(username: string, password: string): Promise<Tokens> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    })

    if (user === null || aesDecrypt(user?.password) !== password)
      throw new UnauthorizedException()

    const now = new Date().getTime()

=======

  async getAllUsers(): Promise<[User[], number]> {
    return await this.userRepository.findAndCount({
      where: { deletedAt: IsNull() },
    })
  }

  async signup(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    })

    if (user !== null) throw new HttpException('Already Exist username', HttpStatus.BAD_REQUEST)

    return await this.userRepository.save(
      this.userRepository.create({
        username,
        password: this.cryptoUtil.encrypt(password),
        createdAt: new Date(),
      }),
    )
  }

  async signin(username: string, password: string): Promise<Tokens> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    })

    if (user === null || this.cryptoUtil.decrypt(user?.password) !== password) throw new UnauthorizedException()

    const now = new Date().getTime()

>>>>>>> Stashed changes
    const payload: JwtVerify = {
      id: user.id,
      username: user.username,
      timestamp: now,
    }

    const accessToken = this.issueAccessToken(payload)
    const refreshToken = this.issueRefreshToken(payload)

    return { accessToken, refreshToken }
  }

  async changePassword(): Promise<void> {
    const users = await this.userRepository.find()

    users.forEach((u) => {
<<<<<<< Updated upstream
      u.password = aesEncrypt('1234')
=======
      u.password = this.cryptoUtil.encrypt('1234')
>>>>>>> Stashed changes
      this.userRepository.save(u)
    })
  }

  private verify(token: string): boolean {
    try {
      this.jwtService.verify(token, {
        secret: process.env.REFRESH_JWT_SECRET,
      })
<<<<<<< Updated upstream
    } catch (e) {
      console.error(e.message)
      return false
    }
    return true
=======
      return true
    } catch (e) {
      error(e.message)
      return false
    }
>>>>>>> Stashed changes
  }

  private issueAccessToken(payload: JwtVerify): string {
    return this.jwtService.sign(payload, {
      algorithm: 'HS256',
    })
  }
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  private issueRefreshToken(payload: JwtVerify): string {
    return this.jwtService.sign(payload, {
      algorithm: 'HS256',
      secret: process.env.REFRESH_JWT_SECRET,
      expiresIn: parseInt(process.env.REFRESH_JWT_EXPIRES),
    })
  }
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  async refresh(refreshToken: any): Promise<Tokens> {
    if (!this.verify(refreshToken)) throw new UnauthorizedException()

    const originalPayload: JwtVerify = this.jwtService.decode(refreshToken)
    const { id, username } = originalPayload
    const payload: JwtVerify = {
      id,
      username,
      timestamp: new Date().getTime(),
    }

    //TODO 유저 검증

    return {
      accessToken: this.issueAccessToken(payload),
      refreshToken: this.issueRefreshToken(payload),
    }
  }
}
