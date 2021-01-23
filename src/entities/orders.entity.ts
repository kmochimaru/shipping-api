import { BaseEntity } from './../modules/shared/base.entity';
import { ORDER_STATUS } from '../modules/orders/enum/order-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn
} from 'typeorm';
import { OrdersItem } from './orders-item.entity';

@Entity()
export class Orders extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    order_id: number;

    @Column()
    @ApiProperty()
    order_code: string;

    @Column({ default: 0 })
    @ApiProperty()
    order_discount: number;

    @Column()
    @ApiProperty()
    order_subtotal: number;

    @Column()
    @ApiProperty()
    order_total: number;

    @Column({ nullable: true })
    @ApiProperty()
    order_start_date: Date;

    @Column({ nullable: true })
    @ApiProperty()
    order_end_date: Date;

    @Column({ default: 0 })
    @ApiProperty()
    order_credit: number;

    @Column({ type: 'text', nullable: true })
    @ApiProperty()
    order_project?: string;

    @Column({ nullable: true })
    @ApiProperty()
    order_ref_no?: string;

    @Column({ type: 'text', nullable: true })
    @ApiProperty()
    order_note?: string;

    @Column({
        type: 'enum',
        enum: ORDER_STATUS,
        default: ORDER_STATUS.Progress,
    })
    @ApiProperty()
    order_status?: number;

    @OneToMany(
        type => OrdersItem,
        orders_item => orders_item.orders,
        { cascade: true, eager: true },
    )
    @JoinColumn({ name: 'order_item_id' })
    @ApiProperty()
    orders_item: OrdersItem[];

    @Column({ nullable: true })
    @ApiProperty()
    order_contact_company?: string;

    @Column({ nullable: true })
    @ApiProperty()
    order_contact_code: string;

    @Column({ type: 'varchar', length: '30', nullable: true })
    @ApiProperty()
    order_contact_branch?: string;

    @Column({ type: 'text' })
    @ApiProperty()
    order_contact_address: string;

    @Column({ nullable: true })
    @ApiProperty()
    order_contact_tin?: string;

    @Column({ type: 'varchar', length: '40' })
    @ApiProperty()
    order_contact_name: string;

    @Column({ nullable: true })
    @ApiProperty()
    order_contact_email?: string;

    @Column()
    @ApiProperty()
    order_contact_phonenumber: string;

    @Column()
    @ApiProperty()
    order_seller: string;
}