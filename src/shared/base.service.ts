import { IListPage } from "./interface";

export abstract class BaseService {

    constructor(private readonly name: string) {
        console.debug(BaseService.name, name);
    }

    protected arrayToPage<T>(
        requestedPage: IListPage,
        data: Array<T>,
    ): Array<T> {
        const dataSafe = data ?? [];
        if (!Array.isArray(dataSafe)) {
            return [];
        }
        const indexSafe = Math.abs(requestedPage.index ?? 0);
        const sizeSafe = Math.abs(requestedPage.size ?? 0);
        const offset: number = (indexSafe * sizeSafe) ?? 0;
        const offsetSafe = (offset > dataSafe.length) ? 0 : offset;
        const end = offsetSafe + sizeSafe;
        return dataSafe.slice(offset, end);
    }
}