import { PrismaService } from '../../prisma/prisma.service.js';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: string): Promise<({
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
    }) | null>;
    create(data: {
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
    }): Promise<{
        id: string;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateRefreshToken(userId: string, _refreshToken: string | null): Promise<({
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
    }) | null>;
}
