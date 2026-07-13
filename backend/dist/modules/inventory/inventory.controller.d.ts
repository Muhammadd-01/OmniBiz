import { InventoryService } from './inventory.service.js';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    createCategory(tenantId: string, body: {
        name: string;
    }): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            tenantId: string;
        };
    }>;
    getCategories(tenantId: string): Promise<{
        data: ({
            products: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                tenantId: string;
                price: number;
                sku: string | null;
                categoryId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            tenantId: string;
        })[];
    }>;
    createProduct(tenantId: string, body: {
        categoryId: string;
        name: string;
        description?: string;
        price: number;
    }): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            tenantId: string;
            price: number;
            sku: string | null;
            categoryId: string;
        };
    }>;
    getProducts(tenantId: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            tenantId: string;
            price: number;
            sku: string | null;
            categoryId: string;
        }[];
    }>;
}
