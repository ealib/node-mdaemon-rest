// node-mdaemon-api
import { MD_AutoResponder } from "node-mdaemon-api";

export class AutoresponderDTO implements MD_AutoResponder {

    //#region implement MD_AutoResponder
    public readonly AddToList: string;
    public readonly Days: number;
    public readonly Enabled: boolean;
    public readonly EndTime: string;
    public readonly Exclude: string;
    public readonly PassMessage: boolean;
    public readonly Process: string;
    public readonly RemoveFromList: string;
    public readonly Script: string;
    public readonly StartTime: string;
    //#endregion

    public static marshal(mdAutoresponder: MD_AutoResponder): AutoresponderDTO {
        return Object.assign(new AutoresponderDTO(), mdAutoresponder);
    }
    
}