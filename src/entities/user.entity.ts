import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";
import { Reply } from "./reply.entity";

@Entity({ engine: 'InnoDB' })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    username: string

    @Column({ type: 'varchar', length: 200, nullable: false })
    password: string

    @Column({ name: 'createdAt', type: 'datetime', nullable: false, default: () => "now()" })
    createdAt: Date

    @Column({ name: 'deletedAt', type: 'datetime', nullable: true })
    deletedAt: Date


    @OneToMany(() => Board, (board: Board) => board.user)
    boards: Board[]

    @OneToMany(() => Reply, reply => reply.user)
    replies: Reply[]

}