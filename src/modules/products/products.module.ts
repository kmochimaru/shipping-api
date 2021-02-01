import { Products } from './../../entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './service/products.service';
import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Products])],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule { };