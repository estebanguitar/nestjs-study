import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Reply } from 'src/entities/reply.entity'
import { User } from 'src/entities/user.entity'
import { IsNull, Repository } from 'typeorm'

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply) private readonly repository: Repository<Reply>,
  ) {}

  async getAll(): Promise<Reply[]> {
    return await this.repository.find({
      where: {
        deletedAt: IsNull(),
      },
      order: {
        id: 'desc',
      },
    })
  }
  async get(id: number): Promise<Reply> {
    const reply = await this.repository.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
      relations: ['board', 'user'],
    })

    if (reply === null) throw new NotFoundException()

    return reply
  }
  async insert(data: Reply, user: User): Promise<Reply> {
    data.userId = user.id
    data.createdAt = new Date()
    return await this.repository.save(data)
  }
  async update(id: number, data: Reply, user: User): Promise<Reply> {
    const reply = await this.repository.findOne({
      where: {
        id,
        userId: user.id,
        deletedAt: IsNull(),
      },
    })

    if (reply === null) throw new NotFoundException()

    reply.content = data.content
    reply.updatedAt = new Date()

    return await this.repository.save(reply)
  }
  async delete(id: number, user: User): Promise<Reply> {
    const reply = await this.repository.findOne({
      where: {
        id,
        userId: user.id,
        deletedAt: IsNull(),
      },
    })

    if (reply === null) throw new NotFoundException()

    reply.deletedAt = new Date()

    return await this.repository.save(reply)
  }
}
