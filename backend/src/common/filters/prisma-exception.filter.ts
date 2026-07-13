import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (exception.code) {
      case 'P2002': {
        status = HttpStatus.CONFLICT;
        message = `Unique constraint failed on the fields: ${(exception.meta as any)?.target}`;
        break;
      }
      case 'P2025': {
        status = HttpStatus.NOT_FOUND;
        message = 'Record to update/delete not found';
        break;
      }
      // Add other Prisma error codes as needed
      default:
        message = exception.message;
        break;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: 'PrismaClientError',
    });
  }
}
