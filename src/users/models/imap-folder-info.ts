import { MD_ImapFolderInfo, MdFolderClass } from "node-mdaemon-api";

export class ImapFolderInfo
    implements MD_ImapFolderInfo {

    public readonly FolderName: string;
    public readonly FolderPath: string;
    public readonly FolderOwner: string;
    public readonly FolderType: MdFolderClass;

    public constructor(s: MD_ImapFolderInfo) {
        Object.assign(this, s);
    }

    public get isSubfolder(): boolean {
        return this.FolderName.includes('/');
    }

    public get splitFolderName(): { prefix: string, suffix: string } {
        const prefix = '';
        const suffix = '';
        return { prefix, suffix }
    }
}