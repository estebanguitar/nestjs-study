import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn("increment")
    id: number;
    @Column()
    title: string;
    @Column()
    content: string;
    @Column()
    author: string;
    @Column({name: "created_at"})
    createdAt: Date;
    @Column({name: "updated_at"})
    updatedAt?: Date;
    @Column({name: "deleted_at"})
    deletedAt?: Date;
}
