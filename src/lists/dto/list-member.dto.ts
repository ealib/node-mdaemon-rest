// NestJS
import { ApiProperty } from '@nestjs/swagger';

// node-mdaemon-api
import {
    MD_ListMember,
    MdListMemberMode,
} from "node-mdaemon-api";

// Application
import { ListMemberFlagsDTO } from './list-member-flags.dto';

export class ListMemberDTO implements MD_ListMember {
    @ApiProperty()
    Email: string;

    @ApiProperty()
    ListName: string;

    @ApiProperty()
    RealName: string;

    @ApiProperty()
    Type: MdListMemberMode;

    @ApiProperty()
    Flags?: ListMemberFlagsDTO;

    public static marshal(entity: MD_ListMember): ListMemberDTO {
        const dto = new ListMemberDTO();
        Object.assign(dto, entity);
        return dto;
    }
}