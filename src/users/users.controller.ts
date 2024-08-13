// NestJS
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Header, NotFoundException, Param, Query, Request, UnauthorizedException } from '@nestjs/common';

// Application
import { ApiQueryPage, ApiQueryPageSize, ApiResponseListOK, ListPageParams } from 'src/shared';
import { AuthenticatedRequest } from 'src/auth/models';
import { RoleHelper, Roles } from '../auth';
import { UserDTO, UserListItemDTO, UserListPageResponseDTO } from './dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {

    public constructor(private readonly usersService: UsersService) { }

    /**
     * Enumerate MDaemon's user database.
     * 
     * Note that there is an implicit filter due to the roles of the caller.
     * 
     * @param req INTERNAL for authorisation
     * @returns array of UserInfoDTO
     */
    @Roles(['user'])
    @ApiOperation({ operationId: 'usersReadAll' })
    @ApiQuery(ApiQueryPage)
    @ApiQuery(ApiQueryPageSize)
    @ApiResponse(ApiResponseListOK('users', UserListPageResponseDTO))
    @Header('Cache-Control', 'none')
    @Get()
    public async readAll(
        @Query('page') page: string | number | undefined = 0,
        @Query('pageSize') pageSize: string | number | undefined = 10,
        @Request() req: AuthenticatedRequest,
    ): Promise<UserListPageResponseDTO> {
        const params = new ListPageParams(page, pageSize);
        const callerRole = new RoleHelper(req);
        params.addFilter('roles', callerRole);
        // if "admin" ALL; if "domainAdmin" domain users ONLY
        const [_, domain] = callerRole.isGlobalAdmin ? [undefined, undefined] : callerRole.id.split('@');
        if (domain) {
            params.addFilter('domain', domain);
        }
        const pageResult = await this.usersService.readAll(params, domain);
        const filteredItems =
            (callerRole.isGlobalAdmin || callerRole.isDomainAdmin)
                ? pageResult.data
                : pageResult.data.filter(item => item.Email === callerRole.id)
        const dtos = filteredItems.map(item => UserListItemDTO.marshal(item));
        return UserListPageResponseDTO.success(dtos, pageResult.total, params);
    }

    /**
     * Read a full user definition from MDaemon user database.
     * 
     * @param id user address
     * @param req INTERNAL for authorisation
     * @returns UserFullInfoDTO on success
     */
    @Roles(['user'])
    @ApiOperation({ operationId: 'usersRead' })
    @Get(':id')
    public async read(
        @Param('id') id: string,
        @Request() req: AuthenticatedRequest
    ): Promise<UserDTO> {
        const role = new RoleHelper(req);
        // if "user" => only info about her/him-self
        // if "domainAdmin" => info about a user in that very domain
        // if role === "admin" info for any user
        if (role.isGlobalAdmin ||
            (role.isDomainAdmin && role.isSameDomain(id)) ||
            (role.isUser && role.isSelf(id))) {
            const userInfo = await this.usersService.read(id);
            if (userInfo) {
                return UserDTO.marshal(userInfo);
            }
            throw new NotFoundException();
        }
        throw new UnauthorizedException();
    }

}
