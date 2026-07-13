import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthTokens> {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    // Create user, tenant, owner role, and link them together in a transaction
    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
          isActive: true, // Dummy email verification: auto-verified
        },
      });

      const tenant = await tx.tenant.create({
        data: {
          name: dto.businessName,
          domain: dto.businessDomain,
        },
      });

      // Create or find the "Owner" role
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

      // Assign role and tenant to user
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

  async login(dto: LoginDto): Promise<AuthTokens> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    return this.generateTokens(user.id, user.email);
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env['JWT_REFRESH_SECRET'] || 'omnibiz-refresh-secret',
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(user.id, user.email);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async validateUser(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }
    return user;
  }

  private generateTokens(userId: string, email: string): AuthTokens {
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
}
