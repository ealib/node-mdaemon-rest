// NestJS
import { ApiProperty } from '@nestjs/swagger';
import { ListListItem } from '../models';

export class ListListItemDTO {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly description?: string;

    public constructor(id: string, description?: string) {
        this.id = id;
        this.description = description;
    }

    public static marshal(entity: ListListItem): ListListItemDTO {
        const dto = new ListListItemDTO(entity.id, entity.description);
        return dto;
    }
}