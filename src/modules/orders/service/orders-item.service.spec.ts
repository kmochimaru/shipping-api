import { Test, TestingModule } from '@nestjs/testing';
import { OrdersItemService } from './orders-item.service';

describe('OrdersItemService', () => {
  let service: OrdersItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersItemService],
    }).compile();

    service = module.get<OrdersItemService>(OrdersItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
