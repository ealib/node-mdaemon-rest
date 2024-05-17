// Express.js
import { Request } from 'express';

export class AuthenticatedRequest extends Request {
    public readonly user: { roles: string[] };
}