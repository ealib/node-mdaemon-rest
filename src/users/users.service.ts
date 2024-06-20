// NestJS
import { Injectable } from '@nestjs/common';

// node-mdaemon-api
import {
    MD_DeleteUser,
    MD_GetByEmail,
    MD_GetFree,
    MD_GetUserInfo,
    MD_UserInfo,
    UserListItem,
    isBadHandle,
    readUserRoles,
    readUsers,
} from 'node-mdaemon-api';

@Injectable()
export class UsersService {

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

    public async readAll(domain?: string): Promise<MD_UserInfo[]> {
        return new Promise<MD_UserInfo[]>(
            (resolve, _) => readUsers((err: any, users?: UserListItem[]) => {
                if (err) {
                    console.error(err);
                    resolve([]);
                } else {
                    const domainUsers =
                        domain
                            ? users.filter(user => {
                                const [_, domainPart] = user.Email.split('@');
                                return domain === domainPart;
                            })
                            : users;
                    const userInfoList: MD_UserInfo[] = [];
                    domainUsers.forEach(async ({ Email }) => {
                        const userInfo = await this.read(Email);
                        userInfoList.push(userInfo);
                    });
                    resolve(userInfoList);
                }
            })
        );
    }

    public async readRoles(email: string): Promise<string[]> {
        return new Promise<string[]>((resolve, _) => {
            readUserRoles(email, (error: Error, roles?: string[]) => {
                resolve(error ? [] : roles);
            })
        });
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
