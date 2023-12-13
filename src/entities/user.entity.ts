import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
    username: string
    @Column()
    password: string
    @Column({name: 'created_at'})
    createdAt: Date
    @Column({name: 'deleted_at'})
    deletedAt: Date
}