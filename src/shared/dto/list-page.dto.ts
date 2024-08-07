import { IListPage } from "../interface";
import { ApiProperty } from '@nestjs/swagger';

export class ListPageDTO implements IListPage {

    @ApiProperty()
    public index: number;   // page number 0...

    @ApiProperty()
    public size: number;   // page size

    constructor(index: number = 0, size: number = 10) {
        this.index = (index >= 0) ? index : 0;
        this.size = (size > 0 && size < 100) ? size : 10;
    }
}