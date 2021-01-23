import { AttachmentsService } from './attachments.service';
import { Attachments } from './../../entities/attachments.entity';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
    model: {
        type: Attachments,
    },
    params: {
        id: {
            field: 'attach_id',
            type: 'number',
            primary: true
        },
    },
})
@Controller('api/v1/attachments')
@ApiTags('Attachments')
export class AttachmentsController implements CrudController<Attachments> {
    constructor(
        public service: AttachmentsService
    ) { }
}
