import { ApiProperty } from "@nestjs/swagger";

export abstract class ResponseDTO {
    @ApiProperty()
    public success = true;

    @ApiProperty()
    public message = 'OK';

    constructor(
        success = true,
        message = 'OK',
    ) {
        this.success = success;
        this.message = message;
    }
}