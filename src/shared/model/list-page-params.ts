import { IListPage } from "../interface";
import { ListFilter } from "./list-filter";

export class ListPageParams {
    public readonly page: IListPage = { index: 0, size: 10 };

    #filters: ListFilter[] = [];

    constructor(page?: number | string, pageSize?: number | string) {
        this.#filters = [];
        if (page) {
            if (typeof page === "number") {
                this.page.index = page >= 0 ? page : 0;
            } else {
                const n = parseInt(page);
                this.page.index = isNaN(n) ? 1 : n;
            }
        }
        if (pageSize) {
            if (typeof pageSize === "number") {
                this.page.size = pageSize >= 1 ? pageSize : 10;
            } else {
                const n = parseInt(pageSize);
                this.page.size = isNaN(n) ? 10 : n;
            }
        }
    }

    public get hasFilters(): boolean {
        return this.#filters.length > 0;
    }
    public get filterNames(): string[] {
        const allProperties = this.#filters.map((filter) => filter.property);
        return allProperties
            .filter((property, index) =>
                allProperties.indexOf(property) == index
            )
            .sort();
    }
    public addFilter(property: string, value: any) {
        this.#filters.push({ property, value });
    }
    public getFilter<TValue>(property: string): TValue[] {
        const values: TValue[] = this.#filters
            .filter((filter) => filter.property === property)
            .map((filter) => (filter.value as TValue));
        return values;
    }
}
