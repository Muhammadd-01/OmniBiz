import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthService } from './auth.service.js';
import type { RegisterDto, LoginDto } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const tokens = await this.authService.register(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Registration successful',
      data: tokens,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const tokens = await this.authService.login(dto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: tokens,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: { refreshToken: string }) {
    const tokens = await this.authService.refreshTokens(body.refreshToken);
    return {
      statusCode: HttpStatus.OK,
      message: 'Tokens refreshed',
      data: tokens,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Current user fetched',
      data: user,
    };
  }
}
