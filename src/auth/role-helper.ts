import { AuthenticatedRequest } from "./models";

export class RoleHelper {

    public readonly id: string;
    public readonly roles: string[];

    public constructor(request: AuthenticatedRequest) {
        const user = request.user;

        this.roles = user?.roles ?? [];
        //this.id=user
    }

    public get isUser(): boolean {
        return (this.roles ?? []).includes('user');
    }
    public isSelf(id: string): boolean {
        return id === this.id;
    }
    public get isGlobalAdmin(): boolean {
        return (this.roles ?? []).includes('admin');
    }
    public get isDomainAdmin(): boolean {
        return (this.roles ?? []).includes('domainAdmin');
    }
    public isSameDomain(id: string): boolean {
        const [_lp0, dp0] = id.split('@');
        const [_lp1, dp1] = this.id.split('@');
        return dp0 === dp1;
    }
}