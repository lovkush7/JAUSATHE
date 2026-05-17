import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CommonEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @DeleteDateColumn()
    DeletedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @CreateDateColumn()
    CreatedAt: Date;

}