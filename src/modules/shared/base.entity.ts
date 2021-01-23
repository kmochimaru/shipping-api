import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class BaseEntity {
    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty()
    created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty()
    updated_at?: Date;
}