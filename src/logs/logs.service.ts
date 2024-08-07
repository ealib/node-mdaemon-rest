// NestJS
import { Injectable, StreamableFile } from '@nestjs/common';

// Node.js
import { opendir, stat, unlink } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

// node-mdaemon-api
import { mdAppPath } from 'node-mdaemon-api';

// Application
import { BaseService, ListPageParams } from 'src/shared';
import { LogFileInfo, LogListPageResult } from './models';

@Injectable()
export class LogsService extends BaseService {
    public readonly path: string;

    private strToHex(name: string): string {
        return Array.from(name).map(s => s.charCodeAt(0).toString(16)).join('');
    }

    constructor() {
        super(LogsService.name);
        this.path = join(mdAppPath, '../Logs');
    }

    private validate(id: string) {
        if (!id) {
            throw new Error('missing log ID');
        }
        if ((id.startsWith('.') || id.includes('\\') || id.includes('/') || id.includes(':'))) {
            throw new Error('invalid log ID ' + id);
        }
    }

    public async read(id: string): Promise<StreamableFile> {
        console.debug('read', id);
        try {
            this.validate(id);
            const fileName = join(this.path, id);
            const stream = createReadStream(fileName);
            return new StreamableFile(stream);
        }
        catch (e) {
            return new StreamableFile(new Uint8Array(e));
        }
    }

    public async readAll(params: ListPageParams): Promise<LogListPageResult> {
        let tot = 0;
        let skip = params.page.index * params.page.size;
        let fill = params.page.size;
        const logFiles: LogFileInfo[] = [];

        try {
            const logsDir = await opendir(this.path);
            let index = 0;
            for await (const dirent of logsDir) {
                console.log('--->', dirent.name);
                if (dirent.isFile) {
                    ++tot;
                    ++index;
                    if ((skip === 0) && (fill > 0)) {
                        const fullName = join(dirent.parentPath, dirent.name);
                        console.log('--->', tot, fullName);
                        const stats = await stat(fullName);
                        const id = this.strToHex(dirent.name);
                        logFiles.push(new LogFileInfo(id, dirent, stats));
                        --fill;
                    } else {
                        console.log('--->', tot, 'SKIPPED');
                        --skip;
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }

        return new LogListPageResult(logFiles, tot);
    }

    public async delete(id: string): Promise<boolean> {
        try {
            this.validate(id);
            await unlink(id);
            return true;
        }
        catch (e) {
            console.debug(e);
        }
        return false;
    }
}
