import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";
import { Reply } from "./reply.entity";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    username: string
    
    @Column()
    password: string
    
    @Column({name: 'created_at'})
    createdAt: Date
    
    @Column({name: 'deleted_at'})
    deletedAt: Date
    

    @OneToMany(() => Board, (board: Board) => board.user)
    boards: Board[]

    @OneToMany(() => Reply, reply => reply.user)
    replies: Reply[]
    
}