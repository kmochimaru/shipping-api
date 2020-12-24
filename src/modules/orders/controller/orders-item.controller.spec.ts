import { Test, TestingModule } from '@nestjs/testing';
import { OrdersItemController } from './orders-item.controller';

describe('OrdersItemController', () => {
  let controller: OrdersItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersItemController],
    }).compile();

    controller = module.get<OrdersItemController>(OrdersItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
