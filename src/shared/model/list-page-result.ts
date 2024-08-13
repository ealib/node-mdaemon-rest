export class ListPageResult<TEntity> {
    constructor(
        public readonly data?: TEntity[],
        public readonly total?: number,
    ) {
        if (!Array.isArray(data)) {
            this.data = [];
        }
        if (total === undefined || total < 0) {
            this.total = 0;
        }
    }
}