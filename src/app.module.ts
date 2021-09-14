import { AuthModule } from './modules/auth/auth.module';
import { Products } from './entities/products.entity';
import { ProductsModule } from './modules/products/products.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { Attachments } from './entities/attachments.entity';
import { AttachmentsModule } from './modules/attachments/attachments.module';
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
      host: '128.199.193.30',
      port: 33060,
      username: 'root',
      password: 'IOTech21',
      database: 'io',
      entities: [
        Users,
        Orders,
        OrdersItem,
        Attachments,
        Products
      ],
      synchronize: true,
      // logging: ['query']
    }),
    UsersModule,
    OrdersModule,
    AttachmentsModule,
    UploadsModule,
    ProductsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
