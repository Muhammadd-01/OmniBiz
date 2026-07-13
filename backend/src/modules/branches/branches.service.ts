import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, data: { name: string; address?: string }) {
    return this.prisma.branch.create({
      data: {
        tenantId,
        name: data.name,
        address: data.address,
      },
    });
  }

  async findAllForTenant(tenantId: string) {
    return this.prisma.branch.findMany({
      where: { tenantId },
      include: { departments: true },
    });
  }
}
