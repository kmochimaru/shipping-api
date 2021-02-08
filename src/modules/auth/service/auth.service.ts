import { JwtPayload } from './../jwt/jwt-payload.inteface';
import { Users } from './../../../entities/users.entity';
import { UsersService } from './../../users/users.service';
import { HttpException, Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private _users: UsersService,
        private _jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<Users> {
        const user = await this._users.findByUsername(username);
        if (!user) {
            throw new HttpException('ไม่พบชื่อผู้ใช้ในระบบ', HttpStatus.FORBIDDEN);
        }

        if (!await this.compareHash(password, user.password)) {
            throw new HttpException('กรุณาตรวจชื่อผู้ใช้กับรหัสผ่านอีกครั้ง', HttpStatus.FORBIDDEN);
        }

        return user;
    }

    async compareHash(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compareSync(password, hash);
    }

    async login(user: JwtPayload) {
        const { _id, username, user_email, user_role, iat } = user;
        return {
            access_token: this._jwtService.sign({
                _id,
                username,
                user_email,
                user_role,
                iat: new Date().getTime(),
            })
        }
    }

}
