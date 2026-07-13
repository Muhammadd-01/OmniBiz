import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tenants/:tenantId/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('categories')
  @Roles('Owner', 'Manager')
  async createCategory(
    @Param('tenantId') tenantId: string,
    @Body() body: { name: string },
  ) {
    const category = await this.inventoryService.createCategory(tenantId, body.name);
    return { data: category };
  }

  @Get('categories')
  @Roles('Owner', 'Manager', 'Staff')
  async getCategories(@Param('tenantId') tenantId: string) {
    const categories = await this.inventoryService.getCategories(tenantId);
    return { data: categories };
  }

  @Post('products')
  @Roles('Owner', 'Manager')
  async createProduct(
    @Param('tenantId') tenantId: string,
    @Body() body: { categoryId: string; name: string; description?: string; price: number },
  ) {
    const product = await this.inventoryService.createProduct(tenantId, body.categoryId, body);
    return { data: product };
  }

  @Get('products')
  @Roles('Owner', 'Manager', 'Staff')
  async getProducts(@Param('tenantId') tenantId: string) {
    const products = await this.inventoryService.getProducts(tenantId);
    return { data: products };
  }
}
