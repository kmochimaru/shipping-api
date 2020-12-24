import { OrdersItem } from './../../entities/orders-item.entity';
import { Orders } from './../../entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrdersController } from './controller/orders.controller';
import { OrdersService } from './service/orders.service';
import { OrdersItemService } from './service/orders-item.service';
import { OrdersItemController } from './controller/orders-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrdersItem])],
  controllers: [OrdersController, OrdersItemController],
  providers: [OrdersService, OrdersItemService],
  exports: [OrdersService, OrdersItemService]
})
export class OrdersModule { }
