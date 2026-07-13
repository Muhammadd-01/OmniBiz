import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(tenantId: string, name: string) {
    return this.prisma.category.create({
      data: {
        tenantId,
        name,
      },
    });
  }

  async getCategories(tenantId: string) {
    return this.prisma.category.findMany({
      where: { tenantId },
      include: { products: true },
    });
  }

  async createProduct(tenantId: string, categoryId: string, data: { name: string; description?: string; price: number }) {
    return this.prisma.product.create({
      data: {
        tenantId,
        categoryId,
        name: data.name,
        description: data.description,
        price: data.price,
      },
    });
  }

  async getProducts(tenantId: string, categoryId?: string) {
    return this.prisma.product.findMany({
      where: { 
        tenantId,
        ...(categoryId ? { categoryId } : {})
      },
    });
  }
}
