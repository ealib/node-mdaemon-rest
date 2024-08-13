// NestJS
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

// node-mdaemon-api
import { MD_LogonUser } from 'node-mdaemon-api';

// Application
import { AuthenticateResponseDTO } from './dto';
import { BaseService } from 'src/shared';
import { JwtPayload } from './models';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService extends BaseService {

    readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
        super(AuthService.name);
        this.logger.debug(this.name);
    }

    public async authenticate(
        email: string,
        secret: string
    ): Promise<AuthenticateResponseDTO> {

        if (!MD_LogonUser(email, secret)) {
            throw new UnauthorizedException();
        }
        const userInfoFull = await this.usersService.read(email);
        if (!userInfoFull) {
            throw new UnauthorizedException();
        }
        // OK: exclude secrets
        const { Password, PasswordEx, ...userInfo } = userInfoFull;
        // Read user roles
        const roles = await this.usersService.readRoles(email);
        // Generate a JWT and return it
        const payload: Partial<JwtPayload> =  {
            roles,
            sub: userInfo.Email,
            username: userInfo.Email,
        };
        const signSignOptions: JwtSignOptions = {};
        const accessToken = await this.jwtService.signAsync(payload, signSignOptions);
        return new AuthenticateResponseDTO(accessToken, email, userInfo.FullName);
    }
}
