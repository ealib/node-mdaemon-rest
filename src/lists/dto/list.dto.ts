import { MD_AD, MD_List, MD_ODBC } from "node-mdaemon-api";

export class ListDTO implements MD_List {
    AD: MD_AD;
    AUTHLogon: string;
    AUTHPassword: string;
    ArchiveURL: string;
    CacheDirty: boolean;
    CatalogName: string;
    DefaultMode: number;
    DigestFlags: number;
    DigestMBF: string;
    FooterFilePath: string;
    HeaderFilePath: string;
    HelpURL: string;
    KillFilePath: string;
    LastAccessTime: string;
    ListDescription: string;
    ListFlags: number;
    ListIDText: string;
    ListName: string;
    ListPassword: string;
    MaxLineCount: number;
    MaxMembers: number;
    MaxMessageCount: number;
    MaxMessageSize: number;
    ModeratorEmail: string;
    NotificationEmail: string;
    ODBC: MD_ODBC;
    OwnerURL: string;
    PrecedenceLevel: number;
    PublicFolderName: string;
    RemoteHost: string;
    ReplyAddress: string;
    RoutingLimit: number;
    SendNotesTo: string;
    SubscribeURL: string;
    UnsubscribeURL: string;
    UserDefined: string;
    WelcomeFilePath: string;
    
    public static marshal(entity: MD_List): ListDTO {
        const dto = new ListDTO();
        Object.assign(dto, entity);
        delete dto.AUTHPassword;
        delete dto.ListPassword;
        return dto;
    }
}