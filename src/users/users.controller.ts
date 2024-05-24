// NestJS
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, NotFoundException, Param, Request, UnauthorizedException } from '@nestjs/common';

// Application
import { RoleHelper, Roles } from '../auth';
import { UsersService } from './users.service';
import { UserFullInfoDTO, UserInfoDTO } from './dto';
import { AuthenticatedRequest } from 'src/auth/models';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {

    public constructor(private readonly usersService: UsersService) { }

    @Roles(['user'])
    @ApiOperation({ operationId: 'usersReadAll' })
    @Get()
    public async readAll(@Request() req: AuthenticatedRequest): Promise<UserInfoDTO[]> {
        const role = new RoleHelper(req);
        // if "admin" ALL; if "domainAdmin" domain users ONLY
        const [_, domain] = role.isGlobalAdmin ? [undefined, undefined] : role.id.split('@');
        const items = await this.usersService.readAll(domain);
        const filteredItems =
            (role.isGlobalAdmin || role.isDomainAdmin)
                ? items
                : items.filter(item => item.Email === role.id)
        return filteredItems.map(item => UserInfoDTO.marshal(item));
    }

    @Roles(['user'])
    @ApiOperation({ operationId: 'usersRead' })
    @Get(':id')
    public async read(
        @Param('id') id: string,
        @Request() req: AuthenticatedRequest
    ): Promise<UserFullInfoDTO> {
        const role = new RoleHelper(req);
        // if "user" => only info about her/his-self
        // if "domainAdmin" => info about a user in that very domain
        // if role === "admin" info for any user
        if (role.isGlobalAdmin ||
            (role.isDomainAdmin && role.isSameDomain(id)) ||
            (role.isUser && role.isSelf(id))) {
            const userInfo = await this.usersService.read(id);
            if (userInfo) {
                return UserFullInfoDTO.marshal(userInfo);
            }
            throw new NotFoundException();
        }
        throw new UnauthorizedException();
    }

}
