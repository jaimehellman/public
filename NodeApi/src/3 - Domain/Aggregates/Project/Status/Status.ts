import {Entity, BaseEntity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity("status")
export class Status extends BaseEntity
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    statusId: number = 0;
    @Column("text")
    name: string;
}