import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    if (exception instanceof HttpException) {
      throw exception;
    }
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const stack = exception.stack as string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const message = exception.message as string;
    const timestamp = new Date().toISOString();

    this.logger.error(
      `[${timestamp}] [ERROR] status: ${status}, message: ${message}, stack: ${stack}`,
    );

    response.status(status).json({
      status,
      message,
      stack,
      timestamp,
    });
  }
}
