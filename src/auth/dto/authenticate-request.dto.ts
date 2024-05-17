import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateRequestDTO {
    @ApiProperty()
    public email: string;

    @ApiProperty()
    public secret: string;
}

