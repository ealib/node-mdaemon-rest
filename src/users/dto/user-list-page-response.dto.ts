// NestJS
import { ApiProperty } from "@nestjs/swagger";

// Application
import { IListPageResponse, ListPageParams, ListPageResponseDTO } from "src/shared";
import { UserListItemDTO } from "./user-list-item.dto";

export class UserListPageResponseDTO
    extends ListPageResponseDTO
    implements IListPageResponse<UserListItemDTO> {

    @ApiProperty({ type: UserListItemDTO, isArray: true })
    public data: UserListItemDTO[] = [];

    public static success(data: UserListItemDTO[], total: number, lpp: ListPageParams): UserListPageResponseDTO {
        const instance = new UserListPageResponseDTO(true, 'OK', total, lpp.page.index, lpp.page.size);
        instance.data = data;
        return instance;
    }
}
