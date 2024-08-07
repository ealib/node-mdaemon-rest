// NestJS
import { ApiProperty } from "@nestjs/swagger";

// Application
import { IListPageResponse, ListPageResponseDTO } from "src/shared";
import { ListListItemDTO } from "./list-list-item.dto";


export class ListListPageResponseDTO
    extends ListPageResponseDTO
    implements IListPageResponse<ListListItemDTO> {

    @ApiProperty()
    public data: ListListItemDTO[] = [];
}