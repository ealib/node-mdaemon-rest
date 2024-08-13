// NestJS
import { ApiProperty } from '@nestjs/swagger';

// node-mdaemon-api
import { UserListItem } from 'node-mdaemon-api';

export class UserListItemDTO  {

    @ApiProperty()
    public Email: string;

    @ApiProperty()
    public FullName: string;

    public static marshal(userInfo: UserListItem) {
        const dto = new UserListItemDTO();
        dto.Email = userInfo.Email;
        dto.FullName=userInfo.FullName;
        return dto;
    }
}