import { UsersService } from './users.service';
import { Users } from './../../entities/users.entity';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

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
})
@Controller('api/v1/users')
export class UsersController implements CrudController<Users> {
    constructor(
        public service: UsersService
    ) { }
}
