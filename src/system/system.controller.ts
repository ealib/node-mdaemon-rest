// NestJS
import { Controller, Get } from '@nestjs/common';

// Application
import { MdInfoDTO, NativeModuleInfoDTO, PkgInfoDTO, SystemInfoDTO } from './dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth';
import { SystemService } from './system.service';

@ApiBearerAuth()
@ApiTags('system')
@Controller('system')
export class SystemController {

    public constructor(private readonly systemService: SystemService) { }

    @Roles(['admin'])
    @ApiOperation({ operationId: 'systemReadInfo' })
    @Get('info')
    public async readVersion(): Promise<SystemInfoDTO> {
        const mdInfo = new MdInfoDTO(await this.systemService.readMdInfo());
        const pkgInfo = new PkgInfoDTO(await this.systemService.readModuleInfo());
        const modules = (await this.systemService.readAllModuleInfo())
            .map(info => new NativeModuleInfoDTO(info));
        return new SystemInfoDTO(mdInfo, pkgInfo, modules);
    }
}
