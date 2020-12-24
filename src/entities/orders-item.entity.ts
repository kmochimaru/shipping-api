import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Orders } from './orders.entity';

@Entity()
export class OrdersItem {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    order_item_id: number;

    @Column()
    @ApiProperty()
    order_item_price: number;

    @Column()
    @ApiProperty()
    order_item_qty: number;

    @Column()
    @ApiProperty()
    order_item_unit: string;

    @Column()
    @ApiProperty()
    order_item_product: string;

    @Column()
    @ApiProperty()
    order_item_type: string;

    @ManyToOne(
        type => Orders, orders => orders.orders_item,
        { onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: 'order_id' })
    @ApiProperty()
    orders: Orders;
}