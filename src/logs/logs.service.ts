// NestJS
import { Injectable, StreamableFile } from '@nestjs/common';

// Node.js
import { opendir, stat, unlink } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

// node-mdaemon-api
import { mdAppPath } from 'node-mdaemon-api';

// Application
import { LogFileInfo } from './models';

@Injectable()
export class LogsService {
    public readonly path: string;

    constructor() {
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

    public async readAll(): Promise<LogFileInfo[]> {
        const logFiles: LogFileInfo[] = [];

        try {
            const logsDir = await opendir(this.path);
            for await (const dirent of logsDir) {
                console.log(dirent.name);
                if (dirent.isFile) {
                    const fullName = join(dirent.parentPath, dirent.name);
                    const stats = await stat(fullName);
                    logFiles.push(new LogFileInfo(dirent, stats));
                }
            }
        } catch (err) {
            console.error(err);
        }

        return logFiles;
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
