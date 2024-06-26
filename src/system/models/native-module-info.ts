import { VersionInfo } from "node-mdaemon-api";

export class NativeModuleInfo {
    constructor(
        public readonly name: string,
        public readonly version: VersionInfo) { }
}