import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";
import { User } from "./user.entity";

@Entity()
export class Reply extends BaseEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number

    @JoinColumn({name: 'board_id'})
    @ManyToOne(() => Board)
    board: Board

    @Column({name: "board_id"})
    boardId: number

    @JoinColumn({name: 'user_id'})
    @ManyToOne(() => User)
    user: User

    @Column({name: "user_id"})
    userId: number

    @Column()
    content: string

    @Column({name: 'created_at'})
    createdAt: Date

    @Column({name: 'updated_at'})
    updatedAt: Date

    @Column({name: 'deleted_at'})
    deletedAt: Date

}