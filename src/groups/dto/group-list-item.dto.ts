// node-mdaemon-api
import { GroupListItem } from "node-mdaemon-api";

export class GroupListItemDTO implements GroupListItem {
    
    //#region implement GroupListItem
    public readonly Description: string;
    public readonly GroupName: string;
    //#endregion

    public static marshal(userGroup: GroupListItem): GroupListItemDTO {
        return Object.assign(new GroupListItemDTO(), userGroup);
    }
}