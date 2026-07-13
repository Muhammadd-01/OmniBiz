import { BranchesService } from './branches.service.js';
export declare class BranchesController {
    private readonly branchesService;
    constructor(branchesService: BranchesService);
    createBranch(tenantId: string, body: {
        name: string;
        address?: string;
    }): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            tenantId: string;
            address: string | null;
        };
    }>;
    getBranches(tenantId: string): Promise<{
        data: ({
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
        })[];
    }>;
}
