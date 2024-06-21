import { MD_ListMember, MdListMemberFlags, MdListMemberMode } from "node-mdaemon-api";

export class ListMemberDTO implements MD_ListMember {
    Email: string;
    ListName: string;
    RealName: string;
    Type: MdListMemberMode;
    Flags?: MdListMemberFlags;
}