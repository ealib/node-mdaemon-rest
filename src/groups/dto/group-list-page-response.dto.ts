// NestJS
import { ApiProperty } from "@nestjs/swagger";

// Application
import { IListPageResponse, ListPageResponseDTO } from "src/shared";
import { GroupListItemDTO } from "./group-list-item.dto";

export class GroupListPageResponseDTO
    extends ListPageResponseDTO
    implements IListPageResponse<GroupListItemDTO> {

    @ApiProperty({ type: GroupListItemDTO, isArray: true })
    public data: GroupListItemDTO[] = [];
}