import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { AuditService } from './audit.service'
import { LoggerFactory } from '../util/logger'
import { Request } from 'express'

// 1. 엔티티 생성
// 2. 모듈, 서비스 생성
// 3. 로직 생성
// 4. 인터셉터 접근
// @Entity()
// export class AuditLog extends BaseEntity {
// }

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  log = LoggerFactory.create(AuditInterceptor)

  constructor(private readonly auditService: AuditService) {}

  private after = () => {
    // TODO add audit log table insert logic
    // auditLogRepository.insertAuditLog(context.getArgs)
    this.log.warn('AuditInterceptor after')
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    this.log.warn('AuditInterceptor before')
    // this.log.error('err', context)
    // const args = context.getArgs<Array<object>>()
    // const constructorRef = context.getClass()
    // const handler = context.getHandler()
    const request = context.switchToHttp().getRequest<Request>()
    console.log(request.ip)
    console.log(request.method)
    console.log(request.user)
    // console.log(request)

    // const tmp = typeof request

    // const audit: Audit = {
    //   requestUrl: args.url,
    //   user: args.user,
    // }
    // console.log(args)
    // args.forEach((e) => {
    //   console.log(e)
    //   console.log('----------------------------------')
    // })
    console.log('================================')
    // console.log(constructorRef)
    // console.log(http.getRequest<Request>())
    // console.log(http.getResponse())
    // console.log('================================')
    // console.log(handler)
    // console.log('================================')

    return next.handle().pipe(tap(this.after))
  }
}
