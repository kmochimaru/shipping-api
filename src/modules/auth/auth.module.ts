import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './jwt/local.strategy';
import { SECRET_KEY } from './jwt/secret-key';
import { UsersModule } from './../users/users.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: SECRET_KEY.secret,
      signOptions: { expiresIn: 3600 }
    })
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // }
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule { }
