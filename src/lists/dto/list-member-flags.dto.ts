import { ApiProperty } from "@nestjs/swagger";
import { MdListMemberFlags } from "node-mdaemon-api";

export class ListMemberFlagsDTO implements MdListMemberFlags {
    @ApiProperty()
    ViaAd?: boolean;

    @ApiProperty()
    ViaOdbc?: boolean;
}