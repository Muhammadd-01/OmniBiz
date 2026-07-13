import { Controller, Get, Patch, Body, UseGuards, Param } from '@nestjs/common';
import { TenantsService } from './tenants.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get(':id')
  @Roles('Owner', 'Admin')
  async getTenant(@Param('id') id: string) {
    const tenant = await this.tenantsService.findById(id);
    return { data: tenant };
  }

  @Patch(':id')
  @Roles('Owner')
  async updateTenant(
    @Param('id') id: string,
    @Body() body: { name?: string; domain?: string },
  ) {
    const tenant = await this.tenantsService.update(id, body);
    return { data: tenant };
  }

  @Patch(':id/modules/:code')
  @Roles('Owner')
  async toggleModule(
    @Param('id') id: string,
    @Param('code') code: string,
    @Body() body: { isActive: boolean },
  ) {
    const tenantModule = await this.tenantsService.toggleModule(id, code, body.isActive);
    return { data: tenantModule };
  }
}
