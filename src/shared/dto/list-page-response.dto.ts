import { ListPageDTO } from "./list-page.dto";

export class ListPageResponseDTO<TDTO> {
    public data: TDTO[] = [];
    public page: ListPageDTO;
    public total: number = 0;
}