// node-mdaemon-api
import { MD_Group } from "node-mdaemon-api";

// Application
import { MdAutoresponderDTO } from "./md-autoresponder.dto";

export class GroupFullInfoDTO implements MD_Group {

    //#region implement MD_Group
    public readonly ADGroupName: string;
    public readonly DNDSchedule: MdAutoresponderDTO; // implements MD_Autoresponder
    public readonly Description: string;
    public readonly DisableComAgent: boolean;
    public readonly DisableInstantMessaging: boolean;
    public readonly GroupName: string;
    public readonly Priority: number;
    public readonly TemplateName: string;
    //#endregion

    public static marshal(userGroup: MD_Group): GroupFullInfoDTO {
        const dto = Object.assign(new GroupFullInfoDTO(), userGroup);
        dto.DNDSchedule = Object.assign(new MdAutoresponderDTO(), userGroup.DNDSchedule);
        return dto;
    }
}