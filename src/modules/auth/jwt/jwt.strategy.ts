import { JwtPayload } from './jwt-payload.inteface';
import { SECRET_KEY } from './secret-key';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SECRET_KEY.secret,
        });
    }

    async validate(payload: JwtPayload) {
        return {
            user_id: payload.user_id,
            username: payload.username,
            user_email: payload.user_email,
            user_role: payload.user_role,
            iat: payload.iat
        };
    }
}