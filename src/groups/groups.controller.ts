// NestJS
import { Controller, Get, Header, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

// Application
import { GroupDTO, GroupListItemDTO, GroupListPageResponseDTO } from './dto';
import { GroupsService } from './groups.service';
import { Roles } from 'src/auth';
import { ApiQueryPage, ApiQueryPageSize, ApiResponseListOK, ListPageParams } from 'src/shared';

@ApiBearerAuth()
@ApiTags('groups')
@Controller('groups')
export class GroupsController {

    public constructor(private readonly groupsService: GroupsService) { }

    /**
     * Enumerate MDaemon's user groups.
     * 
     * @returns array of GroupInfoDTO
     */
    @Roles(['admin'])
    @ApiOperation({ operationId: 'groupsReadAll' })
    @ApiQuery(ApiQueryPage)
    @ApiQuery(ApiQueryPageSize)
    @ApiResponse(ApiResponseListOK('groups', GroupListPageResponseDTO))
    @Header('Cache-Control', 'none')
    @Get()
    public async readAll(
        @Query('page') page: string | number | undefined = 0,
        @Query('pageSize') pageSize: string | number | undefined = 10,
    ): Promise<GroupListPageResponseDTO> {
        const params = new ListPageParams(page, pageSize);
        const entityPage = await this.groupsService.readAll(params);
        const response = new GroupListPageResponseDTO(true, 'OK', entityPage.total, params.page.index, params.page.size);
        const entityDtos = entityPage.data.map(entity => GroupListItemDTO.marshal(entity));
        response.data = entityDtos;
        return response;
    }

    /**
     * Read a group's members.
     * 
     * @param id a group's name
     * @returns array of a group's members
     */
    @Roles(['admin'])
    @ApiOperation({ operationId: 'groupsReadAllMembers' })
    @Get(':id/members')
    public async readAllMembers(@Param('id') id: string): Promise<string[]> {
        return await this.groupsService.readAllMembers(id);
    }

    /**
     * Read a MDaemon's group definition.
     * 
     * @param id a group's name
     * @returns GroupFullInfoDTO
     */
    @Roles(['admin'])
    @ApiOperation({ operationId: 'groupsRead' })
    @Get(':id')
    public async read(@Param('id') id: string): Promise<GroupDTO> {
        const groupInfo = await this.groupsService.read(id);
        if (groupInfo) {
            return GroupDTO.marshal(groupInfo);
        }
        throw new NotFoundException();
    }

}
