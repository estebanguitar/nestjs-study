import { Module } from '@nestjs/common'
import { AuditService } from './audit.service'
import { AuditInterceptor } from './audit.interceptor'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Audit } from '../entities/audit.entity'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [TypeOrmModule.forFeature([Audit])],
  providers: [AuditService, { provide: APP_INTERCEPTOR, useClass: AuditInterceptor }],
})
export class AuditModule {}
