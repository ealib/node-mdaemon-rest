// NestJS
import { Injectable } from '@nestjs/common';

// node-mdaemon-api
import { MdInfo, ModuleInfo, getMdInfo, getModuleInfo, versions } from 'node-mdaemon-api';

// Application
import { BaseService } from 'src/shared';
import { NativeModuleInfo } from './models';

@Injectable()
export class SystemService
    extends BaseService {

    constructor() {
        super(SystemService.name);
    }

    public async readMdInfo(): Promise<MdInfo> {
        return getMdInfo();
    }
    public async readModuleInfo(): Promise<ModuleInfo> {
        return getModuleInfo();
    }
    public async readAllModuleInfo(): Promise<NativeModuleInfo[]> {
        return Object.keys(versions).map(key => new NativeModuleInfo(key, versions[key]));
    }
}
