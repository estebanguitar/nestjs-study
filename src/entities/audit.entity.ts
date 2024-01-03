import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Audit extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'varchar', length: 255 })
  requestUrl: string
  @Column({ name: 'userId', type: 'bigint', unsigned: true, nullable: false })
  userId: number

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User)
  user: User

  method: string

  @CreateDateColumn({ type: 'datetime', name: 'createdAt', nullable: false })
  createdAt: Date
}
