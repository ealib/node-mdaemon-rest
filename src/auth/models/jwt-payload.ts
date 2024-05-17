import { Interface } from "readline";

export class JwtPayload {

    public constructor(
        public readonly sub: string,
        public readonly username: string,
        public readonly roles: string[] = []
    ) { }

    public fromAny(data: Partial<JwtPayload>) {
        const sub = data.sub ?? 'unknown';
        const username = data.username ?? sub;
        const roles = data.roles ?? [];
        return new JwtPayload(sub, username, roles);
    }
}