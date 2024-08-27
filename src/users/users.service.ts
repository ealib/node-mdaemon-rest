// NestJS
import { Injectable, Logger } from "@nestjs/common";

// node-mdaemon-api
import {
    isBadHandle,
    MD_DeleteUser,
    MD_GetByEmail,
    MD_GetFree,
    MD_GetIMAPFolderList,
    MD_GetUserInfo,
    MD_UserInfo,
    readUserRoles,
    readUsers,
    UserListItem,
} from "node-mdaemon-api";

// Application
import { BaseService, ListPageParams } from "src/shared";
import { ImapFolderInfo, UserListPageResult } from "./models";

@Injectable()
export class UsersService extends BaseService {
    readonly logger = new Logger(UsersService.name);

    constructor() {
        super(UsersService.name);
        this.logger.debug(this.name);
    }

    //#region CRUD

    //#region CRUD - CREATE
    //#endregion

    //#region CRUD - READ
    public async read(email: string): Promise<MD_UserInfo | undefined> {
        if (!email) {
            return;
        }
        const hUser = MD_GetByEmail(email);
        if (isBadHandle(hUser)) {
            return;
        }
        const userInfo = MD_GetUserInfo(hUser);
        MD_GetFree(hUser);
        return userInfo;
    }

    public async readAll(params: ListPageParams): Promise<UserListPageResult> {
        return new Promise<UserListPageResult>(
            (resolve, _) =>
                readUsers((err: any, users?: UserListItem[]) => {
                    if (err) {
                        console.error(err);
                        resolve(new UserListPageResult());
                    } else {
                        let domainUsers: UserListItem[] = [];
                        if (params.hasFilters) {
                            const searchDomains = params.getFilter<string>(
                                "domain",
                            );
                            domainUsers = users.filter((user) => {
                                const [_, domainPart] = user.Email.split(
                                    "@",
                                );
                                return searchDomains.includes(domainPart);
                            });
                        } else {
                            domainUsers = users;
                        }
                        const page = this.arrayToPage<UserListItem>(params.page, domainUsers);
                        const result = new UserListPageResult(
                            page,
                            domainUsers.length,
                        );
                        resolve(result);
                    }
                }),
        );
    }

    public async readRoles(email: string): Promise<string[]> {
        return new Promise<string[]>((resolve, _) => {
            readUserRoles(email, (error: Error, roles?: string[]) => {
                resolve(error ? [] : roles);
            });
        });
    }

    public async readFolders(
        email: string,
    ): Promise<ImapFolderInfo[] | undefined> {
        const hUser = MD_GetByEmail(email);
        if (isBadHandle(hUser)) {
            return;
        }
        const flags = 0; // unknown parameter
        const apiResult = MD_GetIMAPFolderList(hUser, flags);
        MD_GetFree(hUser);

        if (!apiResult.Succeeded) {
            console.debug(apiResult.ErrorMessage, apiResult.ErrorCode);
            return;
        }

        const data = apiResult.Data;

        if (!Array.isArray(data) || data.length === 0) {
            return;
        }

        return data.map((fi) => new ImapFolderInfo(fi));
    }
    //#endregion

    //#region CRUD - UPDATE
    //#endregion

    //#region CRUD - DELETE
    public async delete(id: string): Promise<boolean> {
        return MD_DeleteUser(id, 0);
    }
    //#endregion

    //#endregion
}
