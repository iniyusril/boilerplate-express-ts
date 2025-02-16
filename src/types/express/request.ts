import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthContext extends JwtPayload {}
export interface RequestContext extends Request {
    context: AuthContext;
}
