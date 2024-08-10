// node-mdaemon-api
import { MD_Group } from "node-mdaemon-api";

// Application
import { AutoresponderDTO } from "./autoresponder.dto";

export class GroupDTO implements MD_Group {

    //#region implement MD_Group
    public readonly ADGroupName: string;
    public readonly DNDSchedule: AutoresponderDTO; // implements MD_Autoresponder
    public readonly Description: string;
    public readonly DisableComAgent: boolean;
    public readonly DisableInstantMessaging: boolean;
    public readonly GroupName: string;
    public readonly Priority: number;
    public readonly TemplateName: string;
    //#endregion

    public static marshal(userGroup: MD_Group): GroupDTO {
        const dto = Object.assign(new GroupDTO(), userGroup);
        dto.DNDSchedule = Object.assign(new AutoresponderDTO(), userGroup.DNDSchedule);
        return dto;
    }
}