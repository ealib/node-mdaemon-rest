// NestJS
import { ApiProperty } from "@nestjs/swagger";

import { NativeModuleInfo } from "../models";
import { VersionInfoDTO } from "./version-info.dto";

export class NativeModuleInfoDTO {

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly version: VersionInfoDTO;

    constructor(info: NativeModuleInfo) {
        this.name = info.name;
        this.version = new VersionInfoDTO(info.version);
    }
}