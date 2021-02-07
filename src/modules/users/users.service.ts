import { Users } from './../../entities/users.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService extends TypeOrmCrudService<Users>{
    constructor(@InjectRepository(Users) repo) {
        super(repo);
    }

    async findByUsername(username: string): Promise<Users> {
        return await this.repo.findOne({ username });
    }
}
