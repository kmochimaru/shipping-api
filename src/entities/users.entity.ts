import { Attachments } from './attachments.entity';
import { BaseEntity } from './../modules/shared/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
const BCRYPT_HASH_ROUND = 8;
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

    @OneToOne(type => Attachments, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'attach_id' })
    @ApiProperty()
    attachments: Attachments;

    @BeforeInsert()
    private async encryptPassword(): Promise<void> {
        this.password = await this.hashPassword();
    }

    private async hashPassword(): Promise<string> {
        return await bcrypt.hash(this.password, BCRYPT_HASH_ROUND);
    }
}