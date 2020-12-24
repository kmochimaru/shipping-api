import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    user_id: number;

    @Column({ unique: true, length: 30 })
    @ApiProperty()
    username: string;

    @Column()
    @ApiProperty()
    password: string;

    @Column()
    @ApiProperty()
    user_avatar: string;
}