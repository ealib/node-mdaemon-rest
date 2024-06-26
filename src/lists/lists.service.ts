// NestJS
import { Injectable } from '@nestjs/common';

// node-mdaemon-api
import {
    MD_InitListInfo,
    MD_List,
    MD_ListExists,
    MD_ListGetNames,
    MD_ListMember,
    readMailingListMembersSync,
} from 'node-mdaemon-api';

// Application
import { BaseService } from 'src/shared';

@Injectable()
export class ListsService extends BaseService {

    constructor() {
        super(ListsService.name);
    }
    
    public async readAll(): Promise<string[]> {
        return MD_ListGetNames() ?? [];
    }

    public async read(id: string): Promise<MD_List | undefined> {
        if (!id) {
            return;
        }
        if (!MD_ListExists(id)) {
            return;
        }
        return MD_InitListInfo(id);
    }

    public async readAllMembers(
        id: string,
        includeQueries = false,
    ): Promise<MD_ListMember[]> {
        if (!id) {
            return [];
        }
        if (!MD_ListExists(id)) {
            return [];
        }
        try {
            return readMailingListMembersSync(id, includeQueries);
        } catch (e) {
            console.debug(e);
        }
        return [];
    }
}
