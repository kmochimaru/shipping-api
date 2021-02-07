import { UsersModule } from './../users/users.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
