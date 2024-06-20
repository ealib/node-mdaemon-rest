// node-mdaemon-api
import { GroupListItem } from "node-mdaemon-api";

export class GroupInfoDTO implements GroupListItem {
    
    //#region implement GroupListItem
    public readonly Description: string;
    public readonly GroupName: string;
    //#endregion

    public static marshal(userGroup: GroupListItem): GroupInfoDTO {
        return Object.assign(new GroupInfoDTO(), userGroup);
    }
}