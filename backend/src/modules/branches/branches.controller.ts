import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { BranchesService } from './branches.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tenants/:tenantId/branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @Roles('Owner', 'Admin')
  async createBranch(
    @Param('tenantId') tenantId: string,
    @Body() body: { name: string; address?: string },
  ) {
    const branch = await this.branchesService.create(tenantId, body);
    return { data: branch };
  }

  @Get()
  @Roles('Owner', 'Admin', 'Manager')
  async getBranches(@Param('tenantId') tenantId: string) {
    const branches = await this.branchesService.findAllForTenant(tenantId);
    return { data: branches };
  }
}
