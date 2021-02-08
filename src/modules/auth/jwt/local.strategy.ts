import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private _authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        return await this._authService.validateUser(username, password);
    }
}