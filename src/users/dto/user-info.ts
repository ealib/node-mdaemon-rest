// NestJS
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { MD_AutoResponder, MD_Forwarding, MD_UserInfo } from 'node-mdaemon-api';

export class UserInfoDTO  {

    @ApiProperty()
    public Email: string;

    @ApiProperty()
    public FullName: string;

    public static marshal(userInfo: MD_UserInfo) {
        const dto = new UserInfoDTO();
        dto.Email = userInfo.Email;
        dto.FullName=userInfo.FullName;
        return dto;
    }
}