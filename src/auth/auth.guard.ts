import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { isEmpty } from "class-validator";
import { ContextService } from "src/util/context.util";

const IS_PUBLIC_API = 'isPublicApi'
export type PermissionInfo = {
    isPublic: boolean
}

export const ApiPermission = (permissionInfo: PermissionInfo) => SetMetadata(IS_PUBLIC_API, permissionInfo)
export const ApiPermissionPublic = () => ApiPermission({ isPublic: true })
// export const ApiPermissionNotPublic = () => ApiPermission({ isPublic: false })
// export const PublicApi = (isPublicApi: PermissionInfo = { isPublic: false }) => ApiPermission(isPublicApi)

@Injectable()
// export class AuthGuard implements CanActivate {
export class JwtAuthGuard extends AuthGuard('jwt') {
    // constructor(
    //     private readonly reflector: Reflector,
    //     // private readonly jwtService: JwtService
    // ) { }

    // canActivate(context: ExecutionContext): boolean {
    //     const permissionInfo = this.reflector.get(IS_PUBLIC_API, context.getHandler());

    //     console.log(permissionInfo?.isPublic);
        

    //     if(!permissionInfo?.isPublic)
    //         return true;



    //     const token = ContextService.getRequest(context).headers.authorization
    //     // console.log(token);
    //     // this.jwtService.verify(token)
    //     console.log(isEmpty(token), token);
        
    //     if(!isEmpty(token))
    //         token    

    //     return true
    // }



}