// NestJS
import { Injectable, Logger } from "@nestjs/common";

// Node.js
import { hostname } from "node:os";

// node-mdaemon-api
import {
    getMdInfo,
    getModuleInfo,
    MD_ClusterGetEnabled,
    MD_ClusterGetLocalNodeId,
    MD_ClusterGetLocalServerGUID,
    MD_ClusterGetLocalServerId,
    MD_ClusterGetNodeId,
    MD_ClusterGetPrimaryComputerName,
    MD_ClusterGetServerGUID,
    MD_ClusterGetServerId,
    MD_ClusterLocalNodeIsPrimary,
    MdInfo,
    ModuleInfo,
    versions,
} from "node-mdaemon-api";

// Application
import { BaseService } from "src/shared";
import { ClusterInfo, NativeModuleInfo } from "./models";

@Injectable()
export class SystemService extends BaseService {
    readonly logger = new Logger(SystemService.name);

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
        return Object.keys(versions).map((key) =>
            new NativeModuleInfo(key, versions[key])
        );
    }

    public async readClusterInfo(): Promise<ClusterInfo> {
        const ComputerName = hostname();
        const info = new ClusterInfo();
        info.Enabled = MD_ClusterGetEnabled();
        info.LocalNodeId = MD_ClusterGetLocalNodeId();
        info.LocalServerGUID = MD_ClusterGetLocalServerGUID();
        info.LocalServerId = MD_ClusterGetLocalServerId();
        info.NodeId = MD_ClusterGetNodeId(ComputerName);
        info.PrimaryComputerName = MD_ClusterGetPrimaryComputerName();
        info.ServerGUID = MD_ClusterGetServerGUID(ComputerName);
        info.ServerId = MD_ClusterGetServerId(ComputerName);
        info.LocalNodeIsPrimary = MD_ClusterLocalNodeIsPrimary();
        return info;
    }
}
