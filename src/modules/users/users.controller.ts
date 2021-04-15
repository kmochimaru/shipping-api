import { UsersService } from './users.service';
import { Users } from './../../entities/users.entity';
import { Controller, Req } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedBody, ParsedRequest, CrudRequest } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
    model: {
        type: Users,
    },
    params: {
        id: {
            field: 'user_id',
            type: 'number',
            primary: true
        },
    },
    query: {
        join: {
            attachments: {
                eager: true
            }
        },
    },
})
@Controller('api/v1/users')
@ApiTags('Users')
export class UsersController implements CrudController<Users> {
    constructor(
        public service: UsersService
    ) { }

    // get base(): CrudController<Users> {
    //     return this;
    // }

    // @Override('createOneBase') 
    // async findAll (
    //     @ParsedBody() model: Users
    // ) {

    // }

    // @Override()
    // async replaceOne(
    //     @ParsedRequest() params: CrudRequest,
    //     @ParsedBody() user: Users,
    //     @Req() req: any
    // ) {

    // }

}
