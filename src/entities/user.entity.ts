import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Board } from './board.entity'
import { Reply } from './reply.entity'
import { OTP } from './otp.entity'

@Entity({ engine: 'InnoDB' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number

  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email: string

  @Column({ name: 'username', type: 'varchar', length: 100, unique: true })
  username: string

  @Column({ type: 'varchar', length: 200 })
  password: string

  @Column({ name: 'createdAt', type: 'datetime', default: () => 'now()' })
  createdAt: Date

  @Column({ name: 'deletedAt', type: 'datetime', nullable: true })
  deletedAt: Date

  @OneToMany(() => Board, (board: Board) => board.user)
  boards: Board[]

  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Reply[]

  @OneToMany(() => OTP, (otp) => otp.user)
  OTPs: OTP[]

  @Column({ type: 'varchar', length: 255, nullable: true })
  twoFactorAuthSecret: string
}
