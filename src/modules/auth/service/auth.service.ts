import { Users } from './../../../entities/users.entity';
import { UsersService } from './../../users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private _users: UsersService
    ) { }

    async validateUsername(username: string): Promise<Users> {
        return await this._users.findByUsername(username);
    }

    async compareHash(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compareSync(password, hash);
    }

}
