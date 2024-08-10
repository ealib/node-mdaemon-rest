import { GroupListItem as NmaGroupListItem } from 'node-mdaemon-api';

export class GroupListItem
    implements NmaGroupListItem {
        
    Description: string;
    GroupName: string;

    public static marshal(model: NmaGroupListItem) {
        return Object.assign(new GroupListItem(), model);
    }
}