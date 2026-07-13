import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export interface RegisterDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    businessName: string;
    businessDomain: string;
}
export interface LoginDto {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly prisma;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService);
    register(dto: RegisterDto): Promise<AuthTokens>;
    login(dto: LoginDto): Promise<AuthTokens>;
    refreshTokens(refreshToken: string): Promise<AuthTokens>;
    validateUser(userId: string): Promise<{
        roles: ({
            role: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            roleId: string;
        })[];
        tenants: ({
            tenant: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                domain: string;
                subscriptionPlanId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            tenantId: string;
        })[];
    } & {
        id: string;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private generateTokens;
}
