import { Attachments } from './../../entities/attachments.entity';
import { Module } from '@nestjs/common';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Attachments])],
    controllers: [AttachmentsController],
    providers: [AttachmentsService],
    exports: [AttachmentsService]
})
export class AttachmentsModule { }
