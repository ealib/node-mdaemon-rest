// NestJS
import { ApiProperty } from "@nestjs/swagger";

// Application
import { ListPageDTO } from "./list-page.dto";
import { ResponseDTO } from "./response.dto";

export abstract class ListPageResponseDTO extends ResponseDTO {

    @ApiProperty()
    public readonly page: ListPageDTO;

    @ApiProperty()
    public readonly total: number = 0;

    public constructor(
        success: boolean = true,
        message: string = 'OK',
        total?: number,
        page?: number,
        pageSize?: number,
    ) {
        super(success, message);
        this.total = total ?? 0;
        this.page = new ListPageDTO(page, pageSize);
    }

}