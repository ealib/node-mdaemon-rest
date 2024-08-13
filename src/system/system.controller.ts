// NestJS
import { Controller, Get, Header } from '@nestjs/common';

// Application
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseOK } from 'src/shared';
import { MdInfoDTO, NativeModuleInfoDTO, PkgInfoDTO, SystemInfoDTO } from './dto';
import { Roles } from 'src/auth';
import { SystemService } from './system.service';

@ApiBearerAuth()
@ApiTags('system')
@Controller('system')
export class SystemController {

    public constructor(private readonly systemService: SystemService) { }

    /**
     * Request all information on the subsystems that make up the backend.
     * 
     * @returns SystemInfoDTO
     */
    @Roles(['admin'])
    @ApiOperation({ operationId: 'systemReadInfo' })
    @ApiResponse(ApiResponseOK('System information.', SystemInfoDTO))
    @Header('Cache-Control', 'none')
    @Get('info')
    public async readVersion(): Promise<SystemInfoDTO> {
        const mdInfo = new MdInfoDTO(await this.systemService.readMdInfo());
        const pkgInfo = new PkgInfoDTO(await this.systemService.readModuleInfo());
        const modules = (await this.systemService.readAllModuleInfo())
            .map(info => new NativeModuleInfoDTO(info));
        return new SystemInfoDTO(mdInfo, pkgInfo, modules);
    }
}
