import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class TenantsService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
      include: { modules: { include: { module: true } } },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  async update(id: string, data: { name?: string; domain?: string }) {
    return this.prisma.tenant.update({
      where: { id },
      data,
    });
  }

  async toggleModule(tenantId: string, moduleCode: string, isActive: boolean) {
    const businessModule = await this.prisma.businessModule.findUnique({
      where: { code: moduleCode },
    });

    if (!businessModule) {
      throw new NotFoundException('Module not found');
    }

    return this.prisma.tenantModule.upsert({
      where: {
        tenantId_businessModuleId: {
          tenantId,
          businessModuleId: businessModule.id,
        },
      },
      update: { isActive },
      create: {
        tenantId,
        businessModuleId: businessModule.id,
        isActive,
      },
    });
  }
}
