"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_js_1 = require("../../common/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../../common/guards/roles.guard.js");
const roles_decorator_js_1 = require("../../common/decorators/roles.decorator.js");
let DashboardController = class DashboardController {
    async getMetrics(tenantId) {
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
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('metrics'),
    (0, roles_decorator_js_1.Roles)('Owner', 'Admin', 'Manager'),
    __param(0, (0, common_1.Param)('tenantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getMetrics", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, common_1.Controller)('tenants/:tenantId/dashboard')
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map