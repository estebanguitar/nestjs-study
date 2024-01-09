import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { error } from 'console'
import { JwtVerify, Tokens } from 'src/config/config.type'
import { User } from 'src/entities/user.entity'
import { IsNull, Repository } from 'typeorm'
import { CryptoFactory } from '../util/crypto.util'

@Injectable()
export class UserService {
  private readonly cryptoUtil

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    this.cryptoUtil = CryptoFactory.getInstance('PASSWORD')
  }

  // TODO
  // generateTwoFactorAuthSecret = async (user: User): Promise<{ secret: string; otpAuthUrl: string }> => {
  //   const secret = authenticator.generateSecret()
  //   const otpAuthUrl = authenticator.keyuri(user.email, 'ESTEBAN_NEST_BOARD', secret)
  //
  //   await this.setTwoFactorAUthSecret(user.id, secret)
  //
  //   return {
  //     secret,
  //     otpAuthUrl,
  //   }
  // }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: {
        boards: true,
        replies: true,
      },
    })

    if (user === null) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    return user
  }

  async getAllUsers(): Promise<[User[], number]> {
    return await this.userRepository.findAndCount({
      where: { deletedAt: IsNull() },
    })
  }

  async signup(username: string, password: string, email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    })

    if (user !== null) throw new HttpException('Already Exist username', HttpStatus.BAD_REQUEST)

    return await this.userRepository.save(
      this.userRepository.create({
        username,
        email,
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
      u.password = this.cryptoUtil.encrypt('1234')
      this.userRepository.save(u)
    })
  }

  private verify(token: string): boolean {
    try {
      this.jwtService.verify(token, {
        secret: process.env.REFRESH_JWT_SECRET,
      })
      return true
    } catch (e) {
      error(e.message)
      return false
    }
  }

  private issueAccessToken(payload: JwtVerify): string {
    return this.jwtService.sign(payload, {
      algorithm: 'HS256',
    })
  }

  private issueRefreshToken(payload: JwtVerify): string {
    return this.jwtService.sign(payload, {
      algorithm: 'HS256',
      secret: process.env.REFRESH_JWT_SECRET,
      expiresIn: parseInt(process.env.REFRESH_JWT_EXPIRES),
    })
  }

  async refresh(refreshToken: any): Promise<Tokens> {
    if (!this.verify(refreshToken)) throw new UnauthorizedException()

    const originalPayload: JwtVerify = this.jwtService.decode(refreshToken)
    const { id, username } = originalPayload
    const payload: JwtVerify = {
      id,
      username,
      timestamp: new Date().getTime(),
    }

    return {
      accessToken: this.issueAccessToken(payload),
      refreshToken: this.issueRefreshToken(payload),
    }
  }

  private setTwoFactorAUthSecret = async (id: number, secret: string): Promise<User> => {
    const user = await this.userRepository.findOne({ where: { id } })

    if (user === null) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    user.twoFactorAuthSecret = secret

    return await this.userRepository.save(user)
  }

  // TOOD
  // async generateQr(user: User): Promise<{ imageUrl: string }> {
  //   const secret = await this.generateTwoFactorAuthSecret(user)
  //   const imageUrl = await toDataURL(secret.otpAuthUrl)
  //   return { imageUrl }
  // }
}
