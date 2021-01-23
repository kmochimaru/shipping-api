import { Attachments } from './../../entities/attachments.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttachmentsService extends TypeOrmCrudService<Attachments>{
    constructor(@InjectRepository(Attachments) repo) {
        super(repo);
    }
}
