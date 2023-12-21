import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

const IS_PUBLIC_API = 'isPublicApi'
export const PublicApi = () => SetMetadata(IS_PUBLIC_API, true)
export const PrivateApi = () => SetMetadata(IS_PUBLIC_API, false)

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissionInfo =
      this.reflector.getAllAndOverride(IS_PUBLIC_API, [
        context.getHandler(),
        context.getClass(),
      ]) ?? false

    if (permissionInfo) return true

    return super.canActivate(context)
  }
}
