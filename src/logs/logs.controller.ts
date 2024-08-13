// NestJS
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Header, Param, Query, Res, StreamableFile } from '@nestjs/common';

// Express.js
import { Response } from 'express';

// Application
import { ApiQueryPage, ApiQueryPageSize, ApiResponseListOK, ListPageParams, ListPageResponseDTO } from 'src/shared';
import { LogFileInfoDTO, LogListPageResponseDTO } from './dto';
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
     * @param page page number 0..n (default 0)
     * @param pageSize page size (default 10)
     * @returns LogListPageResponseDTO
     */
    @Roles(['admin'])
    @ApiOperation({ operationId: 'logsReadAll' })
    @ApiQuery(ApiQueryPage)
    @ApiQuery(ApiQueryPageSize)
    @ApiResponse(ApiResponseListOK('logs', LogListPageResponseDTO))
    @Header('Cache-Control', 'none')
    @Get()
    public async readAll(
        @Query('page') page: string | number | undefined = 0,
        @Query('pageSize') pageSize: string | number | undefined = 10,
    ): Promise<LogListPageResponseDTO> {
        const params = new ListPageParams(page, pageSize);
        const result = await this.logsService.readAll(params);
        const dtos: LogFileInfoDTO[] =
            result.data.map(logInfo => new LogFileInfoDTO(
                logInfo.id,
                logInfo.dirent.name,
                logInfo.stats.size,
                logInfo.stats.ctime,
                logInfo.stats.mtime,
            ));
        const response = new
            LogListPageResponseDTO(
                true,
                'OK',
                result.total,
                params.page.index,
                params.page.size);
        response.data = dtos;
        console.dir(response);
        return response;
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
    @Header('Cache-Control', 'none')
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
        return await this.logsService.delete(id);
    }

}
