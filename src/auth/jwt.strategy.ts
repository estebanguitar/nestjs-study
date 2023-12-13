import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "src/config/env";
import { User } from "src/entities/user.entity";
import { IsNull, Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)  {

    constructor(@InjectRepository(User) private readonly repository: Repository<User>) {
        super({
            secretOrKey: JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: { username: string, timestamp: Date }): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                username: payload.username,
                deletedAt: IsNull()
            }
        })

        if(user === null) throw new UnauthorizedException();

        return user;
    }

}
