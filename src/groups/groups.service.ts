// NestJS
import { Injectable } from '@nestjs/common';

// node-mdaemon-api
import {
    GroupListItem,
    MD_Group,
    MD_GroupExists,
    MD_GroupGetAllWithDesc,
    MD_GroupGetMembers,
    MD_GroupInit,
} from 'node-mdaemon-api';

// Application
import { BaseService } from 'src/shared';

@Injectable()
export class GroupsService extends BaseService {

    constructor() {
        super(GroupsService.name);
    }

    public async readAll(): Promise<GroupListItem[]> {
        return MD_GroupGetAllWithDesc() ?? [];
    }

    public async read(id: string): Promise<MD_Group | undefined> {
        if (!id) {
            return;
        }
        if (!MD_GroupExists(id)) {
            return;
        }
        return MD_GroupInit(id);
    }

    public async readAllMembers(id: string): Promise<string[]> {
        return MD_GroupExists(id)
            ? MD_GroupGetMembers(id)
            : [];
    }

}
