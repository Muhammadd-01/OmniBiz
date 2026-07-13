import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tenants/:tenantId/dashboard')
export class DashboardController {
  
  @Get('metrics')
  @Roles('Owner', 'Admin', 'Manager')
  async getMetrics(@Param('tenantId') tenantId: string) {
    // Placeholder for actual metrics logic based on tenant modules
    return {
      data: {
        totalRevenue: 15234.50,
        activeCustomers: 342,
        pendingOrders: 12,
        staffCount: 5,
        recentActivity: [
          { type: 'SALE', amount: 120, time: new Date().toISOString() },
          { type: 'NEW_CUSTOMER', name: 'John Doe', time: new Date().toISOString() },
        ]
      },
    };
  }
}
