import { OneToOne } from 'typeorm';
import { Attachments } from './attachments.entity';
import { VatOptions } from './../modules/shared/enums/vat-options.enum';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './../modules/shared/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Products extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    product_id: number;

    @Column({ nullable: true })
    @ApiProperty()
    product_type: string;

    @Column({ nullable: true })
    @ApiProperty()
    product_code: string;

    @Column()
    @ApiProperty()
    product_name: string;

    @Column({ nullable: true })
    @ApiProperty()
    product_cost_note: string;

    @Column({ nullable: true })
    @ApiProperty()
    product_cost_price: number;

    @Column({ type: 'enum', enum: VatOptions, nullable: true })
    @ApiProperty()
    product_cost_vat: VatOptions

    @Column({ nullable: true })
    @ApiProperty()
    product_sell_note: string;

    @Column()
    @ApiProperty()
    product_sell_price: number;

    @Column({ type: 'enum', enum: VatOptions })
    @ApiProperty()
    product_sell_vat: VatOptions;

    @Column()
    @ApiProperty()
    product_unit: string;

    @Column()
    @ApiProperty()
    product_category: string;

    @Column({ nullable: true })
    @ApiProperty()
    product_stock_date: Date;

    @Column({ nullable: true })
    @ApiProperty()
    product_stock_qty: number;

    @Column({ nullable: true })
    @ApiProperty()
    product_stock_price: number;

    @Column({ nullable: true })
    @ApiProperty()
    product_barcode: string;

    @OneToOne(type => Attachments)
    @JoinColumn({ name: 'attach_id' })
    @ApiProperty()
    attachments: Attachments;
}