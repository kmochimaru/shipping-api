import { OrdersItemService } from './../service/orders-item.service';
import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { OrdersItem } from './../../../entities/orders-item.entity';
import { ApiTags } from '@nestjs/swagger';

@Crud({
    model: {
        type: OrdersItem,
    },
    params: {
        id: {
            field: 'order_item_id',
            type: 'number',
            primary: true,
        },
    },
})

@ApiTags('Orders Item')
@Controller('api/v1/orders-item')
export class OrdersItemController {
    constructor(
        public service: OrdersItemService,
    ) { }
}
