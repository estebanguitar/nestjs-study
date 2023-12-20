import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Board } from './board.entity'
import { User } from './user.entity'

@Entity()
export class Reply extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number

  @JoinColumn({ name: 'boardId' })
  @ManyToOne(() => Board)
  board: Board

  @Column({ name: 'boardId', type: 'bigint', unsigned: true, nullable: false })
  boardId: number

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user: User) => user.id)
  user: User

  @Column({ name: 'userId', type: 'bigint', unsigned: true, nullable: false })
  userId: number

  @Column({ type: 'varchar', length: 2000, nullable: false })
  content: string

  @Column({
    name: 'createdAt',
    type: 'datetime',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date

  @Column({ name: 'updatedAt', type: 'datetime', nullable: true })
  updatedAt: Date

  @Column({ name: 'deletedAt', type: 'datetime', nullable: true })
  deletedAt: Date
}
