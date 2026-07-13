import { PrismaService } from '../../prisma/prisma.service.js';
export declare class TenantsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        modules: ({
            module: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                code: string;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            businessModuleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        domain: string;
        subscriptionPlanId: string | null;
    }>;
    update(id: string, data: {
        name?: string;
        domain?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        domain: string;
        subscriptionPlanId: string | null;
    }>;
    toggleModule(tenantId: string, moduleCode: string, isActive: boolean): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        businessModuleId: string;
    }>;
}
