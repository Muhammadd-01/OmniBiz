import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { TenantsModule } from './modules/tenants/tenants.module.js';
import { BranchesModule } from './modules/branches/branches.module.js';
import { DashboardModule } from './modules/dashboard/dashboard.module.js';
import { InventoryModule } from './modules/inventory/inventory.module.js';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, TenantsModule, BranchesModule, DashboardModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
