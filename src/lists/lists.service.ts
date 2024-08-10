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
import { BaseService, ListPageParams } from 'src/shared';
import { ListListItem, ListListPageResult } from './models';

@Injectable()
export class ListsService extends BaseService {

    constructor() {
        super(ListsService.name);
    }
    
    public async readAll(params: ListPageParams): Promise<ListListPageResult> {
        const entityList = MD_ListGetNames() ?? [];
        const entityPage = this.arrayToPage(params.page, entityList);
        const entityPage2 = entityPage.map(listName => {
            const listInfo = MD_InitListInfo(listName);
            return new ListListItem(listName, listInfo?.ListDescription);
        });
        const result = new ListListPageResult(entityPage2, entityList.length);
        return result;
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
