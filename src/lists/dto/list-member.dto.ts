// node-mdaemon-api
import {
    MD_ListMember,
    MdListMemberFlags,
    MdListMemberMode,
} from "node-mdaemon-api";

export class ListMemberDTO implements MD_ListMember {
    Email: string;
    ListName: string;
    RealName: string;
    Type: MdListMemberMode;
    Flags?: MdListMemberFlags;

    public static marshal(entity: MD_ListMember): ListMemberDTO {
        const dto = new ListMemberDTO();
        Object.assign(dto, entity);
        return dto;
    }
}