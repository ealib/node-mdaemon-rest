// NestJS
import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// Application
import { ListDTO, ListListItemDTO, ListMemberDTO } from './dto';
import { ListsService } from './lists.service';
import { Roles } from 'src/auth';


@ApiBearerAuth()
@ApiTags('lists')
@Controller('lists')
export class ListsController {

    public constructor(private readonly listsService: ListsService) { }

    /**
     * Enumerate MDaemon's mailing lists.
     * 
     * @returns array of ListListItemDTO
     */
    @Roles(['admin'])
    @ApiOperation({ operationId: 'listsReadAll' })
    @Get()
    public async readAll(): Promise<ListListItemDTO[]> {
        const lists = await this.listsService.readAll();
        return lists.map(ug => new ListListItemDTO(ug));
    }

    /**
     * Read a mailing list's members.
     * 
     * @param id mailing list's address
     * @param includeQueries 
     * @returns array of ListMemberDTO
     */
    @Roles(['admin'])
    @ApiOperation({ operationId: 'listsReadAllMembers' })
    @Get(':id/members')
    public async readAllMembers(
        @Param('id') id: string,
        @Query('includeQueries') includeQueries?: boolean
    ): Promise<ListMemberDTO[]> {
        const members = await this.listsService.readAllMembers(id, !!includeQueries);
        return members.map(member => ListMemberDTO.marshal(member));
    }

    /**
     * Read a MDaemon's mailing list definition.
     * 
     * @param id mailing list's address
     * @returns ListDTO
     */
    @Roles(['admin'])
    @ApiOperation({ operationId: 'listsRead' })
    @Get(':id')
    public async read(@Param('id') id: string): Promise<ListDTO> {
        const list = await this.listsService.read(id);
        if (list) {
            return ListDTO.marshal(list);
        }
        throw new NotFoundException();
    }

}
