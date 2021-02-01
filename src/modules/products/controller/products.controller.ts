import { Products } from './../../../entities/products.entity';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ProductsService } from './../service/products.service';

@ApiTags('Products')
@Crud({
    model: {
        type: Products
    },
    params: {
        id: {
            field: 'product_id',
            type: 'number',
            primary: true
        }
    },
})

@Controller('api/v1/products')
export class ProductsController implements CrudController<Products> {
    constructor(
        public service: ProductsService,
    ) { }

    @Get('product-categories')
    async getProductCategories() {
        return await this.service.getProductCategories();
    }
}
