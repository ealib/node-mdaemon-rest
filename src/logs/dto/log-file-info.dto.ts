export class LogFileInfoDTO {
    public constructor(
        public readonly name: string,
        public readonly size: number,
        public readonly created: Date,
        public readonly modified: Date,
    ) { }
}