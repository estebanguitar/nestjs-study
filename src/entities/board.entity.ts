import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Reply } from "./reply.entity";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn("increment")
    id: number;
    
    @Column()
    title: string;
    
    @Column()
    content: string;
    
    @JoinColumn({name: 'user_id'})
    @ManyToOne(() => User)
    user: User;

    @Column({name : "user_id"})
    userId: number

    @Column({name: "created_at"})
    createdAt: Date;

    @Column({name: "updated_at"})
    updatedAt?: Date;

    @Column({name: "deleted_at"})
    deletedAt?: Date;

    @OneToMany(() => Reply, reply => reply.board)
    replies: Reply[]
}
