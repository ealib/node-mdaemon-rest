// NestJS
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// Application
import { GroupFullInfoDTO, GroupInfoDTO } from './dto';
import { GroupsService } from './groups.service';
import { Roles } from 'src/auth';

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
    @Get()
    public async readAll(): Promise<GroupInfoDTO[]> {
        const userGroups = await this.groupsService.readAll();
        return userGroups.map(ug => GroupInfoDTO.marshal(ug));
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
    public async read(@Param('id') id: string): Promise<GroupFullInfoDTO> {
        const groupInfo = await this.groupsService.read(id);
        if (groupInfo) {
            return GroupFullInfoDTO.marshal(groupInfo);
        }
        throw new NotFoundException();
    }

}
