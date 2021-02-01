import { Attachments } from './attachments.entity';
import { BaseEntity } from './../modules/shared/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    user_id: number;

    @Column({ unique: true, length: 30 })
    @ApiProperty()
    username: string;

    @Column()
    @ApiProperty()
    password: string;

    @Column({ nullable: true })
    @ApiProperty()
    user_avatar: string;

    @Column({ nullable: true })
    @ApiProperty()
    user_phone_number: string;

    @Column({ nullable: true })
    @ApiProperty()
    user_email: string;

    @OneToOne(type => Attachments)
    @JoinColumn({ name: 'attach_id' })
    @ApiProperty()
    attachments: Attachments;
}