import { ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { error, log } from "console";
import { Observable } from "rxjs";
import { JwtVerify } from "src/config/config.type";
import { UserService } from "src/user/user.service";
import { ContextService } from "src/util/context.util";

const IS_PUBLIC_API = 'isPublicApi'
export const PublicApi = () => SetMetadata(IS_PUBLIC_API, true)
export const PrivateApi = () => SetMetadata(IS_PUBLIC_API, false)

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private readonly reflector: Reflector, 
        private readonly userService: UserService,
    ) { super() }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const permissionInfo = this.reflector.getAllAndOverride(IS_PUBLIC_API, [context.getHandler(), context.getClass()]) ?? false;

        if(permissionInfo)
            return true

        return super.canActivate(context);
    }
    
}

