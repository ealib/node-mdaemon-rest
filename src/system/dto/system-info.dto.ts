// NestJS
import { ApiProperty } from "@nestjs/swagger";

import { MdInfoDTO } from "./md-info.dto";
import { NativeModuleInfoDTO } from "./native-module-info.dto";
import { PkgInfoDTO } from "./pkg-info.dto";

export class SystemInfoDTO {

    @ApiProperty()
    public readonly mdaemon: MdInfoDTO;

    @ApiProperty()
    public readonly module: PkgInfoDTO;

    @ApiProperty()
    public readonly modules: NativeModuleInfoDTO[];

    constructor(
        mdaemon: MdInfoDTO,
        module: PkgInfoDTO,
        modules: NativeModuleInfoDTO[],
    ) {
        this.mdaemon = mdaemon;
        this.module = module;
        this.modules = modules;
    }
}