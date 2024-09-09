// NestJS
import { ApiProperty } from "@nestjs/swagger";

import { ClusterInfo } from "../models";

export class ClusterInfoDTO implements ClusterInfo {
    
    @ApiProperty()
    public Enabled: boolean;
    
    @ApiProperty()
    public LocalNodeId: number;
    
    @ApiProperty()
    public LocalNodeIsPrimary: boolean;
    
    @ApiProperty()
    public LocalServerGUID: string;
    
    @ApiProperty()
    public LocalServerId: number;
    
    @ApiProperty()
    public NodeId: number;
    
    @ApiProperty()
    public PrimaryComputerName: string;
    
    @ApiProperty()
    public ServerGUID: string;
    
    @ApiProperty()
    public ServerId: number;

    public constructor(model: ClusterInfo) {
        Object.assign(this, model);
    }
}
