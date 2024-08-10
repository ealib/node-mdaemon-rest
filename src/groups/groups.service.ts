// NestJS
import { Injectable } from '@nestjs/common';

// node-mdaemon-api
import {
    MD_Group,
    MD_GroupExists,
    MD_GroupGetAllWithDesc,
    MD_GroupGetMembers,
    MD_GroupInit,
} from 'node-mdaemon-api';

// Application
import { BaseService, ListPageParams } from 'src/shared';
import { GroupListItem, GroupListPageResult } from './models';

@Injectable()
export class GroupsService extends BaseService {

    constructor() {
        super(GroupsService.name);
    }

    public async readAll(params: ListPageParams): Promise<GroupListPageResult> {
        const entityList = MD_GroupGetAllWithDesc() ?? [];
        const entityPage = this.arrayToPage(params.page, entityList);
        const data = entityPage.map(g => GroupListItem.marshal(g));
        const result = new GroupListPageResult(data, entityList.length);
        return result;
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
