import { AuthService } from './../service/auth.service';
import { LocalAuthGuard } from './../jwt/local-auth.guard';
import { Controller, Get, HttpCode, Post, Request, UseGuards, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard, Public } from '../jwt/jwt-auth.guard';

@Controller('api/v1/auth')
export class AuthController {

    constructor(
        private _authService: AuthService
    ) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Request() req) {
        return this._authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
