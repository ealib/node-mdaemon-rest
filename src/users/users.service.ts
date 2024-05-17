// NestJS
import { Injectable } from '@nestjs/common';

// node-mdaemon-api
import {
    MD_GetByEmail,
    MD_GetFree,
    MD_GetUserInfo,
    MD_UserInfo,
    isBadHandle,
    readUserRoles,
} from 'node-mdaemon-api';

@Injectable()
export class UsersService {

    public async findOne(email: string): Promise<MD_UserInfo | undefined> {
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

    public async readRoles(email: string): Promise<string[]> {
        return new Promise<string[]>((resolve, _) => {
            readUserRoles(email, (error: Error, roles?: string[]) => {
                resolve (error ? [] : roles);
            })
        });
    }

}
