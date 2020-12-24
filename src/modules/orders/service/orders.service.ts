import { Orders } from '../../../entities/orders.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService extends TypeOrmCrudService<Orders>{
    constructor(@InjectRepository(Orders) repo) {
        super(repo);
    }
}
