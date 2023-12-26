import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/entities/user.entity'
import { IsNull, Repository } from 'typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {
    super({
      secretOrKey: process.env.ACCESS_JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: { id: number; username: string; timestamp: Date }): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id: payload.id,
        // username: payload.username,
        deletedAt: IsNull(),
      },
    })

    if (user === null) throw new UnauthorizedException()

    return user
  }
}

// @Injectable()
// export class JwtRefreshStrategy extends PassportStrategy(Strategy) {
//     // @InjectRepository(User) private readonly repository: Repository<User>
//     constructor() {
//         super({
//             secretOrKey: process.env.REFRESH_JWT_SECRET,
//             jwtFromRequest: ExtractJwt.fromExtractors([
//                 request => request?.cookies['refresh-token']
//             ]),
//             passReqToCallback: true
//         })
//     }

//     async validate(request, payload: { id: number, username: string, timestamp: Date }): Promise<User> {
//         log(request.cookie)
//         log(payload)
//         // const user = await this.repository.findOne({
//         //     where: {
//         //         id: payload.id,
//         //         // username: payload.username,
//         //         deletedAt: IsNull()
//         //     }
//         // })

//         // if (user === null) throw new UnauthorizedException();

//         // return user;
//         return null
//     }
// }
