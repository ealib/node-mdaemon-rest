// NestJS
import { ApiProperty } from "@nestjs/swagger";

import { VersionInfo } from "node-mdaemon-api";

export class VersionInfoDTO {

    @ApiProperty()
    public build: number;

    @ApiProperty()
    public full?: string;

    @ApiProperty()
    public major: number;

    @ApiProperty()
    public minor: number;

    @ApiProperty()
    public release: number;

    @ApiProperty()
    public tag?: string;

    constructor(info: VersionInfo) {
        Object.assign(this, info);
    }
}