"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const users_service_js_1 = require("../users/users.service.js");
const prisma_service_js_1 = require("../../prisma/prisma.service.js");
let AuthService = class AuthService {
    usersService;
    jwtService;
    prisma;
    constructor(usersService, jwtService, prisma) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async register(dto) {
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) {
            throw new common_1.ConflictException('A user with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 12);
        const result = await this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    isActive: true,
                },
            });
            const tenant = await tx.tenant.create({
                data: {
                    name: dto.businessName,
                    domain: dto.businessDomain,
                },
            });
            let ownerRole = await tx.role.findUnique({
                where: { name: 'Owner' },
            });
            if (!ownerRole) {
                ownerRole = await tx.role.create({
                    data: {
                        name: 'Owner',
                        description: 'Full access business owner',
                    },
                });
            }
            await tx.userRole.create({
                data: { userId: user.id, roleId: ownerRole.id },
            });
            await tx.userTenant.create({
                data: { userId: user.id, tenantId: tenant.id },
            });
            return { user, tenant, role: ownerRole };
        });
        return this.generateTokens(result.user.id, result.user.email);
    }
    async login(dto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Account is deactivated');
        }
        return this.generateTokens(user.id, user.email);
    }
    async refreshTokens(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env['JWT_REFRESH_SECRET'] || 'omnibiz-refresh-secret',
            });
            const user = await this.usersService.findById(payload.sub);
            if (!user || !user.isActive) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            return this.generateTokens(user.id, user.email);
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
    }
    async validateUser(userId) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('User not found or inactive');
        }
        return user;
    }
    generateTokens(userId, email) {
        const payload = { sub: userId, email };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env['JWT_SECRET'] || 'omnibiz-secret',
            expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env['JWT_REFRESH_SECRET'] || 'omnibiz-refresh-secret',
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_js_1.UsersService,
        jwt_1.JwtService,
        prisma_service_js_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map