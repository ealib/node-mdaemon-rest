// Node.js
import { Stats, Dirent } from 'node:fs';

export class LogFileInfo {
    constructor(
        public readonly dirent: Dirent,
        public readonly stats: Stats
    ) { }
}