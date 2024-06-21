// NestJS
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// Application
import { ListDTO, ListListItemDTO, ListMemberDTO } from './dto';
import { ListsService } from './lists.service';
import { Roles } from 'src/auth';


@ApiBearerAuth()
@ApiTags('lists')
@Controller('lists')
export class ListsController {

    public constructor(private readonly listsService: ListsService) {}

    @Roles(['admin'])
    @ApiOperation({ operationId: 'listsReadAll' })
    @Get()
    public async readAll(): Promise<ListListItemDTO[]> {
        const lists = await this.listsService.readAll();
        return lists.map(ug => new ListListItemDTO(ug));
    }

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
