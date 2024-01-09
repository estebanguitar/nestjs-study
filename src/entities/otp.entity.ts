import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { User } from './user.entity'

export enum Enable {
  N = 'N',
  Y = 'Y',
}
export const enable = { ...Enable } as const
@Entity()
export class OTP extends BaseEntity {
  @ManyToOne(() => User, (user) => user.OTPs)
  @JoinColumn()
  user: User

  @PrimaryColumn({ comment: '유저 시퀀스 아이디' })
  userId: number

  @Column({ comment: 'OTP secret', nullable: true, length: 100 })
  secret: string

  @Column({ comment: 'OTP 사용 여부', default: enable.N })
  enable: Enable

  @CreateDateColumn({ comment: '생성시각' })
  createdDate: Date
}
