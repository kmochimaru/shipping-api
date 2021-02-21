import { Orders } from '../../../entities/orders.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService extends TypeOrmCrudService<Orders>{
    constructor(@InjectRepository(Orders) repo) {
        super(repo);
    }

    async generateOrderCode() {
        const orders = await this.repo.query(`
            SELECT CONCAT('OR',LPAD(
                IFNULL(
                    (
                        SELECT SUBSTR(order_code, 4)
                        FROM orders
                        AS alias
                        ORDER BY order_code DESC LIMIT 1
                    ) + 1, 1
                ), 5, '0')
            ) AS order_code;
        `);
        return orders[0];
    }
}
