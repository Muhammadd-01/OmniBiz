import { PrismaService } from '../../prisma/prisma.service.js';
export declare class BranchesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(tenantId: string, data: {
        name: string;
        address?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        tenantId: string;
        address: string | null;
    }>;
    findAllForTenant(tenantId: string): Promise<({
        departments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            tenantId: string;
            branchId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        tenantId: string;
        address: string | null;
    })[]>;
}
