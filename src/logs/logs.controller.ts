// NestJS
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Param, Res, StreamableFile } from '@nestjs/common';

// Express.js
import { Response } from 'express';

// Application
import { LogFileInfoDTO } from './dto';
import { LogsService } from './logs.service';
import { Roles } from '../auth';


@ApiBearerAuth()
@ApiTags('logs')
@Controller('logs')
export class LogsController {

    constructor(private readonly logsService: LogsService) { }

    /**
     * Enumerate MDaemon's log files.
     * 
     * @returns array of LogFileInfoDTO
     */
    @Roles(['admin'])
    @ApiOperation({ operationId: 'logsReadAll' })
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

    /**
     * Download a log file.
     * 
     * @param id Name of the file to be downloaded.
     * @param res (NestJS/Express internal)
     * @returns StreamableFile
     */
    @Roles(['admin'])
    @ApiOperation({ operationId: 'logsRead' })
    @Get(':id')
    public async read(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response
    ): Promise<StreamableFile> {
        const stream = await this.logsService.read(id);
        res.set('Content-Type', 'plain/text');
        res.set('Content-Disposition', `attachment; filename="${id}"`);
        return stream;
    }

    /**
     * Delete a log file.
     * 
     * @param id Name of the file to be deleted
     * @returns true on success; false otherwise
     */
    @Roles(['admin'])
    @ApiOperation({ operationId: 'logsDelete' })
    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<boolean> {
        return this.logsService.delete(id);
    }

}
