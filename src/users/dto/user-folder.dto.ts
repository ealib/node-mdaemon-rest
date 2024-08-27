import { MdFolderClass } from 'node-mdaemon-api';
import { ImapFolderInfo } from '../models';

export class UserFolderDTO {
    //#region partially implement ImapFolderInfo
    public readonly FolderName: string;
    public readonly FolderOwner: string;
    public readonly FolderType: MdFolderClass;
    //#endregion

    /**  @description Subfolders */
    public children?: UserFolderDTO[];

    constructor(model: ImapFolderInfo) {
        this.FolderName = model?.FolderName;
        this.FolderOwner = model?.FolderOwner;
        this.FolderType = model?.FolderType;
    }

    public append(model: ImapFolderInfo) {
        if (!this.children) {
            this.children = [];
        }
        this.children.push(new UserFolderDTO(model));
    }
}