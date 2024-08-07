// NestJS
import { Controller, Get, Header, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

// Application
import { ListDTO, ListListItemDTO, ListListPageResponseDTO, ListMemberDTO } from './dto';
import { ListPageParams } from 'src/shared';
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
     * @returns ListListPageResponseDTO
     */
    @Roles(['admin'])
    @ApiOperation({ operationId: 'listsReadAll' })
    @ApiQuery({ name: 'page', required: false, description: 'Requested page number, starting from zero for the first page (default is 0).' })
    @ApiQuery({ name: 'pageSize', required: false, description: 'Page size (default is 10). ' })
    @ApiResponse({ status: 200, description: 'List page response for Mailing lists', type: ListListPageResponseDTO })
    @Header('Cache-Control', 'none')
    @Get()
    public async readAll(
        @Query('page') page: string | number | undefined = 0,
        @Query('pageSize') pageSize: string | number | undefined = 10,
    ): Promise<ListListPageResponseDTO> {
        const params = new ListPageParams(page, pageSize);
        const lists = await this.listsService.readAll(params);
        const dtos = lists.data.map(li => ListListItemDTO.marshal(li));
        const response = new ListListPageResponseDTO(true, 'OK', lists.total, params.page.index, params.page.size);
        response.data = dtos;
        return response;
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
    @ApiParam({ name: 'id', description: 'Mailing list address.' })
    @ApiQuery({ name: 'includeQueries', description: 'Include queries.' })
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
    @ApiParam({ name: 'id', description: 'Mailing list address.' })
    @Get(':id')
    public async read(@Param('id') id: string): Promise<ListDTO> {
        const list = await this.listsService.read(id);
        if (list) {
            return ListDTO.marshal(list);
        }
        throw new NotFoundException();
    }

}
