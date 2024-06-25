// NestJS
import { ApiProperty } from '@nestjs/swagger';

export class ListListItemDTO {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly description?: string;

    public constructor(id: string) {
        this.id = id;
    }
}