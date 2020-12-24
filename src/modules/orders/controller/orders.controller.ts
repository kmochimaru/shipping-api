import { OrdersService } from '../service/orders.service';
import { Orders } from '../../../entities/orders.entity';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
    model: {
        type: Orders,
    },
    params: {
        id: {
            field: 'order_id',
            type: 'number',
            primary: true
        },
    },
    query: {
        join: {
            orders_item: {
                eager: true
            }
        }
    },
})
@Controller('api/v1/orders')
export class OrdersController implements CrudController<Orders> {
    constructor(
        public service: OrdersService
    ) { }
}
