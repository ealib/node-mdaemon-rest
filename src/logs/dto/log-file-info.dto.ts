import { ApiProperty } from '@nestjs/swagger';

export class LogFileInfoDTO {

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly size: number;

    @ApiProperty()
    public readonly created: Date;

    @ApiProperty()
    public readonly modified: Date;

    public constructor(
        name: string,
        size: number,
        created: Date,
        modified: Date,
    ) {
        this.name = name;
        this.size = size;
        this.created = created;
        this.modified = modified;
    }
}