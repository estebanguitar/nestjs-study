import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reply } from "./reply.entity";
import { User } from "./user.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn("increment", { type: "bigint", unsigned: true })
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    title: string;

    @Column({ type: "varchar", length: 5000, nullable: false })
    content: string;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User)
    user: User;

    @Column({ name: "user_id", type: "bigint", unsigned: true, nullable: false })
    userId: number

    @Column({ name: "created_at", type: "datetime", nullable: false, default: () => "now()" })
    createdAt: Date;

    @Column({ name: "updated_at", type: "datetime", nullable: true })
    updatedAt?: Date;

    @Column({ name: "deleted_at", type: "datetime", nullable: true })
    deletedAt?: Date;

    @OneToMany(() => Reply, reply => reply.board)
    replies: Reply[]
}
