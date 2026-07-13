import { Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service.js';
interface JwtPayload {
    sub: string;
    email: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(payload: JwtPayload): Promise<{
        roles: ({
            role: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            roleId: string;
        })[];
        tenants: ({
            tenant: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                domain: string;
                subscriptionPlanId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            tenantId: string;
        })[];
    } & {
        id: string;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
