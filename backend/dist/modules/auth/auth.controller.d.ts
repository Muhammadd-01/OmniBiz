import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import type { RegisterDto, LoginDto } from './auth.service.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./auth.service.js").AuthTokens;
    }>;
    login(dto: LoginDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./auth.service.js").AuthTokens;
    }>;
    refresh(body: {
        refreshToken: string;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./auth.service.js").AuthTokens;
    }>;
    getMe(user: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
}
