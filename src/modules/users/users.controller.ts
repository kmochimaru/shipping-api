import { UsersService } from './users.service';
import { Users } from './../../entities/users.entity';
import { Body, Controller, Get } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedBody } from '@nestjsx/crud';
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

}
