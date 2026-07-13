import { PrismaService } from '../../prisma/prisma.service.js';
export declare class InventoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCategory(tenantId: string, name: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        tenantId: string;
    }>;
    getCategories(tenantId: string): Promise<({
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
    })[]>;
    createProduct(tenantId: string, categoryId: string, data: {
        name: string;
        description?: string;
        price: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        tenantId: string;
        price: number;
        sku: string | null;
        categoryId: string;
    }>;
    getProducts(tenantId: string, categoryId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        tenantId: string;
        price: number;
        sku: string | null;
        categoryId: string;
    }[]>;
}
