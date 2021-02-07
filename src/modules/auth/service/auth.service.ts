import { Users } from './../../../entities/users.entity';
import { UsersService } from './../../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private _users: UsersService
    ) { }

    async validateUsername(username: string): Promise<Users> {
        return await this._users.findByUsername(username);
    }

}
