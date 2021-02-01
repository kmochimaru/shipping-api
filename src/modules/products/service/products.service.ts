import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Products } from './../../../entities/products.entity';

@Injectable()
export class ProductsService extends TypeOrmCrudService<Products> {
    constructor(@InjectRepository(Products) repo) {
        super(repo);
    }

    async getProductCategories() {
        return await this.repo.query(`
            SELECT 
                product_category
            FROM
                products
            GROUP BY product_category
        `);
    }
}
