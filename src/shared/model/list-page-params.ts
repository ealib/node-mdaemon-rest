import { IListPage } from "../interface";

export class ListPageParams {

    public readonly page: IListPage = { index: 0, size: 10 };

    #filters: { [key: string]: any, } = {};

    constructor(page?: number | string, pageSize?: number | string) {
        if (page) {
            if (typeof page === 'number') {
                this.page.index = page >= 0 ? page : 0;
            } else {
                const n = parseInt(page);
                this.page.index = isNaN(n) ? 1 : n;
            }
        }
        if (pageSize) {
            if (typeof pageSize === 'number') {
                this.page.size = pageSize >= 1 ? pageSize : 10;
            } else {
                const n = parseInt(pageSize);
                this.page.size = isNaN(n) ? 10 : n;
            }
        }
    }

    public get hasFilters(): boolean {
        return Object.keys(this.#filters).length > 0;
    }
    public get filterNames(): string[] {
        return Object.keys(this.#filters);
    }
    public addFilter(name: string, value: any) {
        this.#filters[name] = value;
    }
    public getFilter<TValue>(name: string): TValue {
        return this.#filters[name] as TValue;
    }
}