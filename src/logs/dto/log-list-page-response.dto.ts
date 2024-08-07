// NestJS
import { ApiProperty } from "@nestjs/swagger";

// Application
import { IListPageResponse, ListPageResponseDTO } from "src/shared";
import { LogFileInfoDTO } from "./log-file-info.dto";

export class LogListPageResponseDTO
    extends ListPageResponseDTO
    implements IListPageResponse<LogFileInfoDTO> {

    @ApiProperty({ type: Array<LogFileInfoDTO>})
    public data: LogFileInfoDTO[] = [];
}