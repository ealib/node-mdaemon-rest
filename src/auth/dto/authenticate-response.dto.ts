import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateResponseDTO {

    @ApiProperty()
    public readonly accessToken: string;

    @ApiProperty()
    public readonly email: string;

    @ApiProperty()
    public readonly fullName: string;

    constructor(
        accessToken: string,
        email: string,
        fullName: string,
    ) {
        this.accessToken = accessToken;
        this.email = email;
        this.fullName = fullName;
    }
}