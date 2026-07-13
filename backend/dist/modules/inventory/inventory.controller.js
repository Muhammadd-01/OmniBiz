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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const inventory_service_js_1 = require("./inventory.service.js");
const jwt_auth_guard_js_1 = require("../../common/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../../common/guards/roles.guard.js");
const roles_decorator_js_1 = require("../../common/decorators/roles.decorator.js");
let InventoryController = class InventoryController {
    inventoryService;
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    async createCategory(tenantId, body) {
        const category = await this.inventoryService.createCategory(tenantId, body.name);
        return { data: category };
    }
    async getCategories(tenantId) {
        const categories = await this.inventoryService.getCategories(tenantId);
        return { data: categories };
    }
    async createProduct(tenantId, body) {
        const product = await this.inventoryService.createProduct(tenantId, body.categoryId, body);
        return { data: product };
    }
    async getProducts(tenantId) {
        const products = await this.inventoryService.getProducts(tenantId);
        return { data: products };
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Post)('categories'),
    (0, roles_decorator_js_1.Roles)('Owner', 'Manager'),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, roles_decorator_js_1.Roles)('Owner', 'Manager', 'Staff'),
    __param(0, (0, common_1.Param)('tenantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('products'),
    (0, roles_decorator_js_1.Roles)('Owner', 'Manager'),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('products'),
    (0, roles_decorator_js_1.Roles)('Owner', 'Manager', 'Staff'),
    __param(0, (0, common_1.Param)('tenantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getProducts", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, common_1.Controller)('tenants/:tenantId/inventory'),
    __metadata("design:paramtypes", [inventory_service_js_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map