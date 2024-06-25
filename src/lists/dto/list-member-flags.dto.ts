import { MdListMemberFlags } from "node-mdaemon-api";

export class ListMemberFlagsDTO implements MdListMemberFlags {
    ViaAd?: boolean;
    ViaOdbc?: boolean;
}