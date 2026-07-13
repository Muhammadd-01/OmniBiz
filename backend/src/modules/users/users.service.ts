import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: { include: { role: true } },
        tenants: { include: { tenant: true } },
      },
    });
  }

  async create(data: { email: string; password: string; firstName?: string; lastName?: string }) {
    return this.prisma.user.create({ data });
  }

  async updateRefreshToken(userId: string, _refreshToken: string | null) {
    // Store refresh token hash in a future session table.
    // For now, this is a no-op as the schema stores JWT stateless tokens.
    // The token validity is verified via signature only.
    return this.findById(userId);
  }
}
