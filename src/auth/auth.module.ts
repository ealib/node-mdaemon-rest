// NestJS
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Application
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';

@Module({
    controllers: [AuthController],
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10h' },
        }),
    ],
    providers: [
        AuthService,
        UsersService,
    ],
})
export class AuthModule { }
