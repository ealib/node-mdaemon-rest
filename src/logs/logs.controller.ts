// NestJS
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';

import { Response } from 'express';

// Application
import { Roles } from '../auth';
import { LogFileInfoDTO } from './dto';
import { LogsService } from './logs.service';


@ApiBearerAuth()
@ApiTags('logs')
@Controller('logs')
export class LogsController {

    constructor(private readonly logsService: LogsService) { }

    @Roles(['admin'])
    @Get()
    public async readAll(): Promise<LogFileInfoDTO[]> {
        const items = await this.logsService.readAll();
        const list: LogFileInfoDTO[] =
            items.map(logInfo => new LogFileInfoDTO(
                logInfo.dirent.name,
                logInfo.stats.size,
                logInfo.stats.ctime,
                logInfo.stats.mtime,
            ));
        return list;
    }

    @Roles(['admin'])
    @Get(':id')
    public async read(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response
    ): Promise<StreamableFile> {
        const stream = this.logsService.read(id);
        res.set('Content-Type', 'plain/text');
        res.set('Content-Disposition', `attachment; filename="${id}"`);
        return stream;
    }
}
