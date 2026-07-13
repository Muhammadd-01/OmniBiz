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
exports.TenantsController = void 0;
const common_1 = require("@nestjs/common");
const tenants_service_js_1 = require("./tenants.service.js");
const jwt_auth_guard_js_1 = require("../../common/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../../common/guards/roles.guard.js");
const roles_decorator_js_1 = require("../../common/decorators/roles.decorator.js");
let TenantsController = class TenantsController {
    tenantsService;
    constructor(tenantsService) {
        this.tenantsService = tenantsService;
    }
    async getTenant(id) {
        const tenant = await this.tenantsService.findById(id);
        return { data: tenant };
    }
    async updateTenant(id, body) {
        const tenant = await this.tenantsService.update(id, body);
        return { data: tenant };
    }
    async toggleModule(id, code, body) {
        const tenantModule = await this.tenantsService.toggleModule(id, code, body.isActive);
        return { data: tenantModule };
    }
};
exports.TenantsController = TenantsController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_js_1.Roles)('Owner', 'Admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "getTenant", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_js_1.Roles)('Owner'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "updateTenant", null);
__decorate([
    (0, common_1.Patch)(':id/modules/:code'),
    (0, roles_decorator_js_1.Roles)('Owner'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "toggleModule", null);
exports.TenantsController = TenantsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, common_1.Controller)('tenants'),
    __metadata("design:paramtypes", [tenants_service_js_1.TenantsService])
], TenantsController);
//# sourceMappingURL=tenants.controller.js.map