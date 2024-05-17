// NestJS
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

// Application
import { Roles } from './roles.decorator';
import { AuthenticatedRequest } from './models';

@Injectable()
export class RolesGuard implements CanActivate {

    public constructor(private readonly reflector: Reflector) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {

        // @Roles(['role0', 'role1']) => ['role0', 'role1']
        const roles = this.reflector.get(Roles, context.getHandler());

        // No role => public handler
        if (!roles) {
            return true;
        }

        const request: AuthenticatedRequest = context.switchToHttp().getRequest();
        return this.matchRoles(roles, request);
    }

    private matchRoles(requiredRoles: string[], aReq: AuthenticatedRequest): boolean {
        const user = aReq.user;
        const found = user.roles.filter(role => requiredRoles.includes(role));
        return found.length > 0;
    }
}
