// NestJS
import { ApiProperty } from '@nestjs/swagger';

import { MdInfo } from "node-mdaemon-api";

import { VersionInfoDTO } from "./version-info.dto";

export class MdInfoDTO {

    @ApiProperty()
    public is64bit: boolean;

    @ApiProperty()
    public isBetaVersion: boolean;

    @ApiProperty()
    public isDebugVersion: boolean;

    @ApiProperty()
    public isLicenseActive: boolean;

    @ApiProperty()
    public isPresent: boolean;

    @ApiProperty()
    public isProVersion: boolean;

    @ApiProperty()
    public isTrialVersion: boolean;

    @ApiProperty()
    public userCount: number;

    @ApiProperty()
    public version: VersionInfoDTO;

    constructor(info: MdInfo) {
        Object.assign(this, info);
        this.version = new VersionInfoDTO(info.version);
    }
}