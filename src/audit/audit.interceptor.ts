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

  private after = (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>()

    // const before = RequestContext.before
    // const after = RequestContext.after

    // console.log('interceptor before', before)
    // console.log('interceptor after', after)
    // console.log(request.file)
    // console.log(request.files.length)
    // for (const i in Object.keys(request.files)) {
    //   console.log(request.files[i])
    // }
    const files = request.files
    // console.log(files)
    if (files != null) {
      const filenames: string[] = []
      for (const i in Object.keys(files)) {
        // console.log(request.files[i])
        filenames.push(files[i].originalname)
      }
    }
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(tap(() => this.after(context)))
  }
}
