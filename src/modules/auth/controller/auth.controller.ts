import { AuthService } from './../service/auth.service';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

@Controller('api/v1/auth')
export class AuthController {

    constructor(
        private _auth: AuthService
    ) { }

    @Post('login')
    async login(
        @Res() res: any,
        @Body() data: { username: string, password: string }
    ) {
        const resultUser = await this._auth.validateUsername(data.username);

        if (!resultUser) {
            return await res.status(HttpStatus.FORBIDDEN).json({ message: 'ไม่พบชื่อผู้ใช้ในระบบ' })
        }

        if (!await this._auth.compareHash(data.password, resultUser.password)) {
            return await res.status(HttpStatus.FORBIDDEN).json({ message: 'กรุณาตรวจชื่อผู้ใช้กับรหัสผ่านอีกครั้ง' })
        }

        return await res.json(resultUser);
    }
}
