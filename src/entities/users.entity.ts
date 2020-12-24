import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ unique: true, length: 30 })
    username: string;

    @Column()
    password: string;

    @Column()
    user_avatar: string;
}