import { OrdersItem } from './entities/orders-item.entity';
import { OrdersModule } from './modules/orders/orders.module';
import { Orders } from './entities/orders.entity';
import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '178.128.217.228',
      port: 33060,
      username: 'root',
      password: 'hwsSeedsoft',
      database: 'shipping',
      entities: [
        Users,
        Orders,
        OrdersItem
      ],
      synchronize: true,
    }),
    UsersModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
