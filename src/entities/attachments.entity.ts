import { BaseEntity } from '../modules/shared/base.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Attachments extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    attach_id: number;

    @Column()
    @ApiProperty()
    attach_file_name: string;

    @Column()
    @ApiProperty()
    attach_file_type: string;

    @Column({ nullable: true })
    @ApiProperty()
    attach_doc_code: string;

    @Column()
    @ApiProperty()
    attach_path: string;
}