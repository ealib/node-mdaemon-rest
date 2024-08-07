export class ListPageResult<TEntity> {
    constructor(
        public readonly data: TEntity[],
        public readonly total: number) { }
}