import { OrdersItem } from './../../../entities/orders-item.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersItemService extends TypeOrmCrudService<OrdersItem> {
    constructor(@InjectRepository(OrdersItem) repo) {
        super(repo);
    }
}
