// NestJS
import { ApiProperty } from "@nestjs/swagger";

import { ModuleInfo } from "node-mdaemon-api";
import { VersionInfoDTO } from "./version-info.dto";

export class PkgInfoDTO {

    @ApiProperty()
    public fileName: string;

    @ApiProperty()
    public isPrerelease: boolean;

    @ApiProperty()
    public isFreeVersion: boolean;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public version: VersionInfoDTO;

    public constructor(info: ModuleInfo) {
        Object.assign(this, info);
        this.version = new VersionInfoDTO(info.version);
    }
}