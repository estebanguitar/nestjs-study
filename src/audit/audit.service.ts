import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Audit } from '../entities/audit.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AuditService {
  constructor(@InjectRepository(Audit) private readonly repository: Repository<Audit>) {}

  async save(): Promise<void> {}
}
