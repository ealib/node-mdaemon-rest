// NestJS
import { ApiProperty } from '@nestjs/swagger';

// node-mdaemon-api
import { MD_AD, MD_List, MD_ODBC } from "node-mdaemon-api";

export class ListDTO implements MD_List {
    @ApiProperty()
    AD: MD_AD;

    @ApiProperty()
    AUTHLogon: string;

    @ApiProperty()
    AUTHPassword: string;

    @ApiProperty()
    ArchiveURL: string;

    @ApiProperty()
    CacheDirty: boolean;

    @ApiProperty()
    CatalogName: string;

    @ApiProperty()
    DefaultMode: number;

    @ApiProperty()
    DigestFlags: number;

    @ApiProperty()
    DigestMBF: string;

    @ApiProperty()
    FooterFilePath: string;

    @ApiProperty()
    HeaderFilePath: string;

    @ApiProperty()
    HelpURL: string;

    @ApiProperty()
    KillFilePath: string;
    
    @ApiProperty()
    LastAccessTime: string;

    @ApiProperty()
    ListDescription: string;
    
    @ApiProperty()
    ListFlags: number;

    @ApiProperty()
    ListIDText: string;

    @ApiProperty()
    ListName: string;
    
    @ApiProperty()
    ListPassword: string;
    
    @ApiProperty()
    MaxLineCount: number;
    
    @ApiProperty()
    MaxMembers: number;
    
    @ApiProperty()
    MaxMessageCount: number;
    
    @ApiProperty()
    MaxMessageSize: number;
    
    @ApiProperty()
    ModeratorEmail: string;
    
    @ApiProperty()
    NotificationEmail: string;
    
    @ApiProperty()
    ODBC: MD_ODBC;
    
    @ApiProperty()
    OwnerURL: string;
    
    @ApiProperty()
    PrecedenceLevel: number;
    
    @ApiProperty()
    PublicFolderName: string;
    
    @ApiProperty()
    RemoteHost: string;
    
    @ApiProperty()
    ReplyAddress: string;
    
    @ApiProperty()
    RoutingLimit: number;
    
    @ApiProperty()
    SendNotesTo: string;
    
    @ApiProperty()
    SubscribeURL: string;
    
    @ApiProperty()
    UnsubscribeURL: string;
    
    @ApiProperty()
    UserDefined: string;
    
    @ApiProperty()
    WelcomeFilePath: string;
    
    public static marshal(entity: MD_List): ListDTO {
        const dto = new ListDTO();
        Object.assign(dto, entity);
        delete dto.AUTHPassword;
        delete dto.ListPassword;
        return dto;
    }
}