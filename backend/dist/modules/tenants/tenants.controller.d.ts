import { TenantsService } from './tenants.service.js';
export declare class TenantsController {
    private readonly tenantsService;
    constructor(tenantsService: TenantsService);
    getTenant(id: string): Promise<{
        data: {
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
        };
    }>;
    updateTenant(id: string, body: {
        name?: string;
        domain?: string;
    }): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            domain: string;
            subscriptionPlanId: string | null;
        };
    }>;
    toggleModule(id: string, code: string, body: {
        isActive: boolean;
    }): Promise<{
        data: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            businessModuleId: string;
        };
    }>;
}
